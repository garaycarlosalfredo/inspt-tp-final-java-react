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
public class ZoneEmployeeDao {
    @Schema(description = "Id del empleado", example = "1")
    private Integer employeeId;
    @Schema(description = "Id de la zona", example = "1")
    private Integer zoneId;
    @Schema(description = "Cantidad de autos asignados", example = "1")
    private Integer carsAsignedNumber;  
}
