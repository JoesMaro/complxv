package com.gestion.trabajo.controller;

import com.gestion.trabajo.entity.Empleado;
import com.gestion.trabajo.reports.EmpleadoExporterExcel;
import com.gestion.trabajo.reports.EmpleadoExporterPDF;
import com.gestion.trabajo.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping({"/empleados","/"})
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @GetMapping("/")
    public String home() {
        return "redirect:/empleados";
    }

    @GetMapping("/empleados")
    public String listarEmpleados(Model model, @RequestParam(defaultValue = "") String keyword,
                                  @RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "3") int size) {
        try {
            Pageable paging = PageRequest.of(page, size);
            Page<Empleado> pageEmpleados;

            if (keyword == null || keyword.isEmpty()) {
                pageEmpleados = empleadoRepository.findAll(paging);
            } else {
                pageEmpleados = empleadoRepository.findByNombresContainingIgnoreCase(keyword, paging);
                model.addAttribute("keyword", keyword);
            }

            List<Empleado> empleados = pageEmpleados.getContent();
            model.addAttribute("empleados", empleados);
            model.addAttribute("currentPage", pageEmpleados.getNumber());
            model.addAttribute("totalItems", pageEmpleados.getTotalElements());
            model.addAttribute("totalPages", pageEmpleados.getTotalPages());
            model.addAttribute("pageSize", size);
        } catch (Exception exception) {
            model.addAttribute("message", exception.getMessage());
        }
        return "empleados";
    }

    @GetMapping("/empleados/nuevo")
    public String agregarEmpleado(Model model) {
        Empleado empleado = new Empleado();
        model.addAttribute("empleado", empleado);
        model.addAttribute("pageTitle", "Nuevo empleado");
        return "empleado_form";
    }

    @PostMapping("/empleados/save")
    public String guardarEmpleado(Empleado empleado, RedirectAttributes redirectAttributes) {
        try {
            // Verificar si el empleado ya existe en la base de datos
            if (empleado.getId() != null) {
                // Si el empleado ya tiene un ID, se trata de una edición
                Optional<Empleado> optionalEmpleado = empleadoRepository.findById(empleado.getId());
                if (optionalEmpleado.isPresent()) {
                    Empleado existingEmpleado = optionalEmpleado.get();
                    existingEmpleado.setNombres(empleado.getNombres());
                    existingEmpleado.setCiudad(empleado.getCiudad());
                    existingEmpleado.setCelular(empleado.getCelular());
                    existingEmpleado.setEdad(empleado.getEdad());
                    existingEmpleado.setCedula(empleado.getCedula());
                    empleadoRepository.save(existingEmpleado);
                    redirectAttributes.addFlashAttribute("message", "El empleado ha sido actualizado con éxito");
                } else {
                    // Si el empleado no se encuentra en la base de datos, redirigir a la lista de empleados
                    redirectAttributes.addFlashAttribute("message", "Empleado no encontrado");
                }
            } else {
                // Si el empleado no tiene ID, se trata de un nuevo empleado, guardar como nuevo
                empleadoRepository.save(empleado);
                redirectAttributes.addFlashAttribute("message", "El empleado ha sido guardado con éxito");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("message", e.getMessage());
        }
        return "redirect:/empleados";
    }

    @GetMapping("/empleados/editar/{id}")
    public String editarEmpleado(@PathVariable("id") Integer id, Model model) {
        Optional<Empleado> optionalEmpleado = empleadoRepository.findById(id);
        if (optionalEmpleado.isPresent()) {
            Empleado empleado = optionalEmpleado.get();
            model.addAttribute("empleado", empleado);
            model.addAttribute("pageTitle", "Editar empleado");
            return "empleado_form"; // Este es el formulario de edición
        } else {
            return "redirect:/empleados";
        }
    }






    @GetMapping("/empleados/eliminar/{id}")
    public String eliminarEmpleado(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        try {
            empleadoRepository.deleteById(Math.toIntExact(id));
            redirectAttributes.addFlashAttribute("message", "Empleado eliminado con éxito");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("message", "Error al eliminar el empleado");
        }
        return "redirect:/empleados";
    }

    @RequestMapping("/export/excel")
    public void generarReporteExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.ms-excel");
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormat.format(new Date());
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=empleados_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);
        List<Empleado> empleados = empleadoRepository.findAll();
        EmpleadoExporterExcel exporterExcel = new EmpleadoExporterExcel(empleados);
        exporterExcel.export(response);
    }

    @RequestMapping("/export/pdf")
    public void generarReportePdf(HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormat.format(new Date());
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=empleados_" + currentDateTime + ".pdf";
        response.setHeader(headerKey, headerValue);
        List<Empleado> empleados = empleadoRepository.findAll();
        EmpleadoExporterPDF exporterPdf = new EmpleadoExporterPDF(empleados);
        exporterPdf.export(response);
    }
}

