/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service;

import com.inspt.AdministracionGarageFinal.dto.VehicleDto;
import com.inspt.AdministracionGarageFinal.dao.VehicleDao;
import com.inspt.AdministracionGarageFinal.model.Garage;
import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.Vehicle;
import com.inspt.AdministracionGarageFinal.model.VehicleType;
import com.inspt.AdministracionGarageFinal.repository.GarageRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleTypeRepository;
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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author garay
 */
@Service
@AllArgsConstructor
public class VehicleService implements IVehicleService{
    
    @Autowired
    VehicleRepository vehicleRepository;
    
    @Autowired
    UserService userService;
    
    @Autowired
    TypeService typeService;
    
    @Autowired
    GarageRepository garageRepository;
    
    @Autowired
    MessageSource messageSource;

    
    // <editor-fold defaultstate="collapsed" desc="createVehicle()">
    @Override
    public ResponseEntity<?> createVehicle(VehicleDao vehicleRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        
        try {
         
            Optional<User> owner = userService.getUserByDni(vehicleRequest.getOwnerDni());
            Optional<VehicleType> type = typeService.getById(vehicleRequest.getTypeId());
            
           if(owner.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Dueño del vehiculo","dni = "+vehicleRequest.getOwnerDni()}, Locale.US));
            }            
            if(type.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Tipo de vehiculo","Id = "+vehicleRequest.getTypeId()}, Locale.US));
            }
            
            Vehicle vehicle = new Vehicle(
                null,
                vehicleRequest.getPlate(),
                vehicleRequest.getName(),
                type.get(),
                vehicleRequest.getWidth(),//whidth
                vehicleRequest.getLength(),
                owner.get()
            );
            vehicleRepository.save(vehicle);
            return ResponseEntity.ok(mapVehicleToVehicleDto(vehicle));
        } catch (DataIntegrityViolationException  e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.Duplicate-entry", new Object[]{"Matricula "+vehicleRequest.getPlate(),"dni = "+vehicleRequest.getOwnerDni()}, Locale.US));
        }
    }
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="updateVehicle()">
    public ResponseEntity<?> updateVehicle(Integer id,VehicleDao vehicleRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        try {
         
            Optional<User> owner = userService.getUserByDni(vehicleRequest.getOwnerDni());
            Optional<VehicleType> type = typeService.getById(vehicleRequest.getTypeId());
            Optional<Vehicle> vehicle = vehicleRepository.findById(id);
            
            if(owner.isEmpty() && vehicleRequest.getOwnerDni() != null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Dueño del vehiculo","dni = "+vehicleRequest.getOwnerDni()}, Locale.US));
            }            
            if(type.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Tipo de vehiculo","Id = "+vehicleRequest.getTypeId()}, Locale.US));
            }
            if(vehicle.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo","id = "+id}, Locale.US));
            }
            vehicle.get().setPlate(vehicleRequest.getPlate());
            vehicle.get().setName(vehicleRequest.getName());            
            vehicle.get().setVehicleType(type.get());            
            vehicle.get().setWidth(vehicleRequest.getWidth());
            vehicle.get().setLength(vehicleRequest.getLength());
            
            vehicle.get().setOwner(owner.get());
            
            vehicleRepository.save(vehicle.get());
            
            return ResponseEntity.ok(mapVehicleToVehicleDto(vehicle.get()));
        } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update vehiculo"}, Locale.US));
        }    
    }
    // </editor-fold >
    
    // <editor-fold defaultstate="collapsed" desc="deleteVehicle()">
    public ResponseEntity<?> deleteVehicle(Integer id) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        
        try {
            Optional<Vehicle> vehicle = vehicleRepository.findById(id);
            if(vehicle.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo","id = "+id}, Locale.US));
            }
            
            //Cambiar asignaciones de garage 
            Optional<Garage> garage= garageRepository.findByVehiclePlate(vehicle.get().getPlate());
            
            if(garage.isPresent()){
                garage.get().setVehicle(null);                
                garageRepository.save(garage.get());
            }
            
            vehicleRepository.delete(vehicle.get());
            return ResponseEntity.ok(messageSource.getMessage("ok.entity.es.delete", new Object[]{"matricula "+vehicle.get().getPlate()," del dueño dni = "+vehicle.get().getOwner().getDni()}, Locale.US));
        } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update vehiculo"}, Locale.US));
        } 
    }    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="findAll()">
    @Override
    public ResponseEntity<?> findAll() {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            List<Vehicle> listVehicle = vehicleRepository.findAll();
            List<VehicleDto> listVehicleDto = new ArrayList<>();

            for (Vehicle vehicle : listVehicle) {
                listVehicleDto.add(mapVehicleToVehicleDto(vehicle));
            }
            return ResponseEntity.ok(listVehicleDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal=", new Object[]{"Find All"}, Locale.US));
        }
    }    
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="findByPlate()">
    @Override
    public ResponseEntity<?> findByPlate(String plate) {
        //        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            Optional<Vehicle> vehicle = vehicleRepository.findByPlate(plate);            
            if(vehicle.isPresent()){
                return ResponseEntity.ok(mapVehicleToVehicleDto(vehicle.get()));
            }else{
                //return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehiculo no encontrado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo",plate}, Locale.US));
            }            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal=", new Object[]{"Error"}, Locale.US));
        }
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="findByOwnerDni()">
    @Override
    public ResponseEntity<?> findByOwnerDni(Integer ownerDni) {        
        //        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            List<Vehicle> listVehicle = vehicleRepository.findByOwnerDni(ownerDni);
            List<VehicleDto> listVehicleDto = new ArrayList<>();

            for (Vehicle vehicle : listVehicle) {
                listVehicleDto.add(mapVehicleToVehicleDto(vehicle));
            }
            
            if(!listVehicleDto.isEmpty()){
                return ResponseEntity.ok(listVehicleDto);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo",ownerDni}, Locale.US));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal=", new Object[]{"Find By Id"}, Locale.US));
        }
    }
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="findByOwnerDni()">
    public ResponseEntity<?> findByOwnerDniList(Integer ownerDni) {        
        //        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            List<Vehicle> listVehicle = vehicleRepository.findByOwnerDni(ownerDni);
            List<VehicleDto> listVehicleDto = new ArrayList<>();

            for (Vehicle vehicle : listVehicle) {
                listVehicleDto.add(mapVehicleToVehicleDto(vehicle));
            }
            
            return ResponseEntity.ok(listVehicleDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal=", new Object[]{"Find By Id"}, Locale.US));
        }
    }
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="serchVehicle()">
    @Override
    public ResponseEntity<?> serchVehicle(String plate, Integer ownerDni){
        
        if(plate != null && plate != ""){
            return findByPlate(plate);
        }
        
        if(ownerDni != null){
            return findByOwnerDni(ownerDni);
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageSource.getMessage("error.entity.es.bad-request", new Object[]{"Patente", "Dni dueño"}, Locale.US));
    }    
    // </editor-fold>    
    
    
    
    //MAPPERS
    
    // <editor-fold defaultstate="collapsed" desc="mapVehicleToVehicleDto()">
    public VehicleDto mapVehicleToVehicleDto (Vehicle vehicle){
        VehicleDto vehicleDto = new VehicleDto();
                vehicleDto.setId(vehicle.getId());
                vehicleDto.setPlate(vehicle.getPlate());
                vehicleDto.setName(vehicle.getName());
                vehicleDto.setVehicleType(vehicle.getVehicleType());
                vehicleDto.setWidth(vehicle.getWidth());
                vehicleDto.setLength(vehicle.getLength());
                vehicleDto.setOwner(userService.mapUserToUserPartnerDto(vehicle.getOwner()));
        return vehicleDto;
    }
    
    // </editor-fold> Vehicle -> VehicleDto

    Optional<Vehicle> getByPlate(String plate) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
          //        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        
        Optional<Vehicle> vehicle = vehicleRepository.findByPlate(plate);   
        return vehicleRepository.findByPlate(plate);
    }

}
