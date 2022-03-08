/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service.iservice;

import com.inspt.AdministracionGarageFinal.dto.VehicleDto;
import com.inspt.AdministracionGarageFinal.dao.VehicleDao;
import java.util.List;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author garay
 */
public interface IVehicleService {    
    ResponseEntity<?> findAll();
    ResponseEntity<?> findByPlate(String plate);
    ResponseEntity<?> findByOwnerDni(Integer ownerDni);
    ResponseEntity<?> serchVehicle(String plate, Integer ownerDni);
    ResponseEntity<?> createVehicle(VehicleDao vehicleRequest);
}
