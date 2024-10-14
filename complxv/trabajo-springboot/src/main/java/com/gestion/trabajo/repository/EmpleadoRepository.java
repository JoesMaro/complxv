package com.gestion.trabajo.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gestion.trabajo.entity.Empleado;
@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {
    Page<Empleado> findByNombresContainingIgnoreCase(String keyword, Pageable pageable);
}