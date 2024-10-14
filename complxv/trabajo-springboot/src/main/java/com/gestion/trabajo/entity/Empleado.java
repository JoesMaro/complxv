package com.gestion.trabajo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="empleados")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 255, nullable = false)
    private String nombres;

    @Column(length = 100)
    private String ciudad;

    @Column(length = 15)
    private String celular;

    @Column
    private int edad;

    @Column(length = 10) // Suponiendo que la cédula es un número de 10 dígitos
    private String cedula;

    // Getters y Setters para la propiedad cedula
    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }
}
