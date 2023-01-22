/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.dao;

import com.inspt.AdministracionGarageFinal.model.VehicleType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 *
 * @author garay
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class VehicleDao {
        
    @Schema(description = "patente del vehiculo", example = "ABC123")
    private String plate;
    
    @Schema(description = "nombre del vehiculo", example = "Camioneta")
    private String name;  
    
    @Schema(description = "tipo del vehiculo", example = "1")
    private Integer typeId;    
    
    @Schema(description = "ancho del vehiculo", example = "1.6")
    private float width;    
        
    @Schema(description = "largo del vehiculo", example = "3.6")
    private float length;    
    
    @Schema(description = "dni del dueño del vehiculo", example = "31200000")
    private Integer ownerDni;
}
