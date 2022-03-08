/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.mappers;

import com.inspt.AdministracionGarageFinal.dto.ZoneEmployeeDto;
import com.inspt.AdministracionGarageFinal.model.ZoneEmployee;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;

/**
 *
 * @author garay
 */
@NoArgsConstructor
public class Mappers {   
    
        // <editor-fold defaultstate="collapsed" desc="mapZoneEmployeeToZoneEmployeeDto ()">
    public ZoneEmployeeDto mapZoneEmployeeToZoneEmployeeDto (ZoneEmployee ze){
        ZoneEmployeeDto zoneEmployeeDto = new ZoneEmployeeDto();
        zoneEmployeeDto.setId(ze.getEmployeeAsigned().getId());
        zoneEmployeeDto.setEmployeeId(ze.getEmployeeAsigned().getEmployeeId());
        zoneEmployeeDto.setZoneId(ze.getZoneAsigned().getId());
        zoneEmployeeDto.setZoneLetter(ze.getZoneAsigned().getLetter());
        return zoneEmployeeDto;
    }
    
    // </editor-fold> Vehicle -> VehicleDto
}
