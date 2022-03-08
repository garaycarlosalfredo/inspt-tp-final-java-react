/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service;

import com.inspt.AdministracionGarageFinal.dto.VehicleDto;
import com.inspt.AdministracionGarageFinal.dao.VehicleDao;
import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.Vehicle;
import com.inspt.AdministracionGarageFinal.model.VehicleType;
import com.inspt.AdministracionGarageFinal.repository.VehicleRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleTypeRepository;
import com.inspt.AdministracionGarageFinal.service.iservice.ITypeService;
import com.inspt.AdministracionGarageFinal.service.iservice.IVehicleService;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author garay
 */
@Service
@AllArgsConstructor
public class TypeService implements ITypeService{
    

    @Autowired
    VehicleTypeRepository vehicleTypeRepository;
    
    @Autowired
    MessageSource messageSource;


    // <editor-fold defaultstate="collapsed" desc="findAll()">
    @Override
    public ResponseEntity<?> findAll() {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            List<VehicleType> listVehicleType = vehicleTypeRepository.findAll();            
            return ResponseEntity.ok(listVehicleType);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CREATED).body("No se pudo encotrar los tipos de vehiculos");
        }
    }    
    // </editor-fold>

    @Override
    public Optional<VehicleType> getById(Integer typeId) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.        
        return vehicleTypeRepository.findById(typeId);
    }

    
}
