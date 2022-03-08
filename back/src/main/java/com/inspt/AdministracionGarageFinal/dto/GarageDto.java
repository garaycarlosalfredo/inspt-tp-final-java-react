/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.dto;


import com.inspt.AdministracionGarageFinal.model.VehicleType;
import java.time.LocalDateTime;
import javax.persistence.*;
import javax.validation.constraints.Null;
import lombok.*;
import org.springframework.lang.Nullable;

/**
 *
 * @author garay
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GarageDto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    private Integer id;
    
    private float lightMeter;
    
    private boolean maintenance;
    
    private LocalDateTime assignmentDate;
    
    private LocalDateTime saleDate;
    
    private VehicleDto vehicle;
        
    private UserPartnerDto owner;
    
    private ZoneDto zone;    
        
    private float width;
    
    private float length; 
    
    private VehicleType vehicleType;
}
