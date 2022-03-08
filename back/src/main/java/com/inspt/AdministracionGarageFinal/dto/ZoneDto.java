/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.dto;

import com.inspt.AdministracionGarageFinal.model.VehicleType;
import lombok.*;

/**
 *
 * @author garay
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ZoneDto {
    private Integer id;
    
    private char letter;
    
    private Integer vehicleQuantity;

    private VehicleType vehicleType;    
    
    private float width;      
    
    private float length;    
    
    private Integer carsQuantity;    
}
