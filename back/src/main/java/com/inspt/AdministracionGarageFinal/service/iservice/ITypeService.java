/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service.iservice;

import com.inspt.AdministracionGarageFinal.model.VehicleType;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author garay
 */
public interface ITypeService {

    ResponseEntity<?> findAll();
    Optional<VehicleType> getById(Integer typeId);
}
