package com.gestion.trabajo.reports;

import com.gestion.trabajo.entity.Empleado;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;

import java.awt.*;
import java.io.IOException;
import java.util.List;

import static com.lowagie.text.FontFactory.*;

public class EmpleadoExporterPDF {

    private List<Empleado> empleados;

    public EmpleadoExporterPDF(List<Empleado> empleados) {
        this.empleados = empleados;
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(5);
        Font font = getFont(HELVETICA);
        font.setColor(Color.WHITE);
        cell.setPhrase(new Phrase("Cedula", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Nombres", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Ciudad", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Celular", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Edad", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        for (Empleado empleado : empleados) {
            table.addCell(String.valueOf(empleado.getNombres()));
            table.addCell(empleado.getNombres());
            table.addCell(empleado.getCiudad());
            table.addCell(empleado.getCelular());
            table.addCell(String.valueOf(empleado.getEdad()));
        }
    }

    public void export(HttpServletResponse response) throws IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();
        Font font = getFont(HELVETICA_BOLD);
        font.setSize(18);
        font.setColor(Color.BLUE);
        Paragraph p = new Paragraph("Lista de empleados", font);
        p.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(p);
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100f);
        table.setWidths(new float[]{1.3f, 3.5f, 3.5f, 2.0f, 1.5f});
        table.setSpacingBefore(10);
        writeTableHeader(table);
        writeTableData(table);
        document.add(table);
        document.close();
    }
}
