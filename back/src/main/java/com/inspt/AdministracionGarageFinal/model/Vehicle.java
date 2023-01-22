/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.*;

/**
 *
 * @author garay
 */
@Entity(name = "vehicle")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    private Integer id;
    
    @NotNull
    @Column(unique = true)
    private String plate;
    
    //Contraseña
    @NotNull(message = "El nombre no puede estar vacío")
    private String name;
    
    @JoinColumn(name = "vehicleType", referencedColumnName = "id")
    @ManyToOne
    private VehicleType vehicleType;
    
    private float width;
    
    private float length;    
    
    @JoinColumn(name = "owner", referencedColumnName = "id")
    @ManyToOne    
    private User owner;
}
