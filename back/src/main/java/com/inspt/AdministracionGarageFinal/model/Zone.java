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
@Entity(name = "zone")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    private Integer id;
    
    @NotNull(message = "La letra no puede estar vacío")
    @Column(unique = true)
    private char letter;    

    @JoinColumn(name = "vehicleType", referencedColumnName = "id")
    @ManyToOne
    private VehicleType vehicleType;
    
    private Integer carsQuantity;
    
    private float width;
    
    private float length;

}
