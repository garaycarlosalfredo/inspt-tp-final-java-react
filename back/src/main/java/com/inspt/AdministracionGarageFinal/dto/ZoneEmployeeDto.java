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
public class ZoneEmployeeDto {
    private Integer id;
    
    private Integer zoneId;
    private char zoneLetter;  
    
    private Integer userId;
    private String employeeId;
    
    private Integer carsAsignedNumber; 
}
