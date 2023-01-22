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
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ZoneDao {
    @Schema(description = "Id de la zona", example = "1")
    private Integer id;       
    @Schema(description = "Letra de la zona", example = "A")
    private char letter;    
    @Schema(description = "Id del tipo de vehiculo", example = "1")
    private Integer vehicleTypeId;
    @Schema(description = "Ancho de los garages pertenecientes al zona", example = "3.5")
    private float width;  
    @Schema(description = "Largo de los garages pertenecientes al zona", example = "3.5") 
    private float length;
    @Schema(description = "Cantidad de autos en la zona", example = "3.5") 
    private Integer carsQuantity;
}
