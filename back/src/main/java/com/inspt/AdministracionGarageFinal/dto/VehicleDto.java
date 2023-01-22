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

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class VehicleDto {
    private Integer id;
    private String plate;    
    private String name;
    private float width;
    private float length;
    private VehicleType vehicleType;    
    private UserPartnerDto owner;    
}
