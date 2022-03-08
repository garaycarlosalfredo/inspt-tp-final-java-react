/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.model;

import java.time.LocalDateTime;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.*;
import org.springframework.lang.Nullable;

/**
 *
 * @author garay
 */
@Entity(name = "garage")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Garage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    private Integer id;
    
    @Nullable
    private float lightMeter;
    
    @NotNull(message = "El nombre no puede estar vacío")
    private boolean maintenance;
    
    @Nullable
    private LocalDateTime assignmentDate;
    
    @Nullable
    private LocalDateTime saleDate;
    
    @JoinColumn(name = "vehicle", referencedColumnName = "id")
    @ManyToOne
    private Vehicle vehicle;
        
    @JoinColumn(name = "owner", referencedColumnName = "id")
    @ManyToOne    
    private User owner;
    
    @JoinColumn(name = "zone", referencedColumnName = "id")
    @ManyToOne    
    private Zone zone;
    
    @JoinColumn(name = "vehicleType", referencedColumnName = "id")
    @ManyToOne
    private VehicleType vehicleType;
        
    private float width;
    
    private float length;  
}
