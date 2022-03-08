/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service;

import com.inspt.AdministracionGarageFinal.dto.GarageDto;
import com.inspt.AdministracionGarageFinal.dao.GarageDao;
import com.inspt.AdministracionGarageFinal.dto.VehicleDto;
import com.inspt.AdministracionGarageFinal.dao.VehicleDao;
import com.inspt.AdministracionGarageFinal.model.Garage;
import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.Vehicle;
import com.inspt.AdministracionGarageFinal.model.VehicleType;
import com.inspt.AdministracionGarageFinal.model.Zone;
import com.inspt.AdministracionGarageFinal.repository.GarageRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleTypeRepository;
import com.inspt.AdministracionGarageFinal.service.iservice.IVehicleService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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
public class GarageService {
    
    @Autowired
    GarageRepository garageRepository;
    
    @Autowired
    ZoneService zoneService;
    
    @Autowired
    VehicleService vehicleService;
    
    @Autowired
    UserService userService;
    
    @Autowired
    TypeService typeService;
    
    @Autowired
    MessageSource messageSource;

    
// <editor-fold defaultstate="collapsed" desc="createGarage()">
    
    public ResponseEntity<?> createGarage(GarageDao garageRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        
        try {         
                        
            Garage garage = new Garage();
                garage.setLightMeter(garageRequest.getLightMeter());//Medidor
                garage.setMaintenance((garageRequest.getMaintenance() == 1) ? true : false);
                //garage.setZone(zone.get());
                garage.setWidth(garageRequest.getWidth());
                garage.setLength(garageRequest.getLength());
           
            if(garageRequest.getTypeId() != null){   
                Optional<VehicleType> type = typeService.getById(garageRequest.getTypeId());
                if(type.isPresent()){
                    garage.setVehicleType(type.get());
                }else{
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Tipo de vehiculo","Id = "+garageRequest.getTypeId()}, Locale.US));
                }
            }else{
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Tipo de vehiculo","Id = "+garageRequest.getTypeId()}, Locale.US));
            }

            if(garageRequest.getZoneId() != null){   
                Optional<Zone> zone = zoneService.getById(garageRequest.getZoneId());
                if(zone.isPresent()){
                    garage.setZone(zone.get());
                }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Zona ","Id = "+garageRequest.getZoneId()}, Locale.US));
                        }
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Zona ","Id = "+garageRequest.getZoneId()}, Locale.US));
            }
              
            if(garageRequest.getOwnerDni() != null){
                Optional<User> owner = userService.getUserByDni(garageRequest.getOwnerDni());         
                if(owner.isPresent()){
                    garage.setOwner(owner.get());
                    garage.setSaleDate(LocalDateTime.now());
                }else{
                   return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Dueño del vehiculo","dni = "+garageRequest.getOwnerDni()}, Locale.US));
                }
            }   
            
            if(garageRequest.getPlate()!= null){            
                Optional<Vehicle> vehicle = vehicleService.getByPlate(garageRequest.getPlate());
                if(vehicle.isPresent()){
                    
                    Optional<Garage> garageAsignado = garageRepository.findByVehiclePlate(vehicle.get().getPlate());            
                    if(garageAsignado.isPresent()){                    
                        garageAsignado.get().setVehicle(null);
                    }
                    garage.setVehicle(vehicle.get());
                    garage.setAssignmentDate(LocalDateTime.now());
                }else{
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo ","Id = "+garageRequest.getPlate()}, Locale.US));
                } 
            }
            
            garageRepository.save(garage);
            return ResponseEntity.ok(mapGarageToGarageDto(garage));
        } catch (Exception e) {
            System.out.println("Error");
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"crear garage"}, Locale.US));
        }
    }
    
//     </editor-fold>
    
// <editor-fold defaultstate="collapsed" desc="updateGarage()">
    public ResponseEntity<?> updateGarage(Integer id,GarageDao garageRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        try {
         
            //Optional<VehicleType> type = typeService.getById(garageRequest.getTypeId());
            Optional<Garage> garage = garageRepository.findById(id);
            
            //Verificación si vino un dni de dueño nuevo
            if(garageRequest.getOwnerDni() != null){
                Optional<User> owner = userService.getUserByDni(garageRequest.getOwnerDni());
                if(owner.isEmpty()){
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Dueño del garage","dni = "+garageRequest.getOwnerDni()}, Locale.US));
                }else{
                    if(garage.get().getOwner() != owner.get()) garage.get().setSaleDate(LocalDateTime.now());
                    garage.get().setOwner(owner.get());  
                }
            }
            

            
            if(garageRequest.getTypeId() != null){   
                Optional<VehicleType> type = typeService.getById(garageRequest.getTypeId());
                if(type.isPresent()){
                    garage.get().setVehicleType(type.get());
                }else{
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Tipo de vehiculo","Id = "+garageRequest.getTypeId()}, Locale.US));
                }
            }else{
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Tipo de vehiculo","Id = "+garageRequest.getTypeId()}, Locale.US));
            }
            
            if(garageRequest.getPlate()!= null){
                 Optional<Vehicle> vehicle = vehicleService.getByPlate(garageRequest.getPlate());
                if(vehicle.isEmpty()){
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo  no encontrado ","matricula = "+garageRequest.getPlate()}, Locale.US));
                }else{
                    if(garage.get().getVehicleType()==vehicle.get().getVehicleType()){                    
                        if(garage.get().getVehicle() != vehicle.get()) garage.get().setAssignmentDate(LocalDateTime.now());
                        garage.get().setVehicle(vehicle.get());  
                    }else{
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.bad-value", new Object[]{"Tipo de vehiculo incompatible con el garage = "+garage.get().getVehicleType().getName(),"matricula = "+vehicle.get().getVehicleType().getName()}, Locale.US));
                    }

                }               
            }
            
            if(garageRequest.getZoneId() != null){   
                Optional<Zone> zone = zoneService.getById(garageRequest.getZoneId());
                if(zone.isPresent()){
                    garage.get().setZone(zone.get());
                }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Zona ","Id = "+garageRequest.getZoneId()}, Locale.US));
                        }
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Zona ","Id = "+garageRequest.getZoneId()}, Locale.US));
            }
            
            if(garage.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"garage","id = "+id}, Locale.US));
            }

            garage.get().setLightMeter(garageRequest.getLightMeter());//Medidor
            garage.get().setMaintenance((garageRequest.getMaintenance() == 1) ? true : false);
            garage.get().setWidth(garageRequest.getWidth());
            garage.get().setLength(garageRequest.getLength());
            
            garageRepository.save(garage.get());
            return ResponseEntity.ok(mapGarageToGarageDto(garage.get()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update garage"}, Locale.US));
        }    
    }
    // </editor-fold >    
    
// <editor-fold defaultstate="collapsed" desc="unasignedOwnerGarage()">
    public ResponseEntity<?> unasignedOwnerGarage(Integer id) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        try {
         
            //Optional<VehicleType> type = typeService.getById(garageRequest.getTypeId());
            Optional<Garage> garage = garageRepository.findById(id);
            
            //Verificación si vino un dni de dueño nuevo
      
            garage.get().setOwner(null);
            garage.get().setSaleDate(null);
            garageRepository.save(garage.get());
            return ResponseEntity.ok("Vendido");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update garage"}, Locale.US));
        }    
    }
    // </editor-fold >
 
    
// <editor-fold defaultstate="collapsed" desc="asignedOwnerGarage()">
    public ResponseEntity<?> asignedOwnerGarage(Integer id,GarageDao garageRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        try {
         
            //Optional<VehicleType> type = typeService.getById(garageRequest.getTypeId());
            Optional<Garage> garage = garageRepository.findById(id);
            
            //Verificación si vino un dni de dueño nuevo
            Optional<User> owner = userService.getUserByDni(garageRequest.getOwnerDni());
            if(owner.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Dueño del garage","dni = "+garageRequest.getOwnerDni()}, Locale.US));
            }else{
                if(garage.get().getOwner() != owner.get()) garage.get().setSaleDate(LocalDateTime.now());
                garage.get().setOwner(owner.get());  
            }
      
            garageRepository.save(garage.get());
            return ResponseEntity.ok("Vendido");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update garage"}, Locale.US));
        }    
    }
    // </editor-fold >    

// <editor-fold defaultstate="collapsed" desc="asignZoneGarage()">
    public ResponseEntity<?> asignZoneGarage(GarageDao garageRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        try {
            //Verificación si vino un dni de dueño nuevo
            
            Optional<Zone> zone = zoneService.getById(garageRequest.getZoneId());
            if(zone.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Zona","id = "+garageRequest.getZoneId()}, Locale.US));
            }
      
            Optional<Garage> garage = garageRepository.findById(garageRequest.getId());
            
            if(garage.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Garage","id = "+garageRequest.getId()}, Locale.US));
            }
            
            List<Garage> listaGarage = garageRepository.findByZoneLetter(zone.get().getLetter());            
            
            if(zone.get().getCarsQuantity() <= listaGarage.size()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.limite-alcanzado", new Object[]{" mázima cantidad de autos/gareges = "+zone.get().getCarsQuantity()}, Locale.US));
              
            }
            
            if(zone.get().getVehicleType().getId() != garage.get().getVehicleType().getId()){
                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.tipos-diferentes", new Object[]{"tipo de zona "+zone.get().getVehicleType().getDescription(),"tipo de garage "+garage.get().getVehicleType().getDescription()}, Locale.US));
           }
            
            garage.get().setZone(zone.get());
            garageRepository.save(garage.get());
            return ResponseEntity.ok(mapGarageToGarageDto(garage.get()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"asigning zone garage"}, Locale.US));
        }    
    }
    // </editor-fold >  

// <editor-fold defaultstate="collapsed" desc="unasignZoneGarage()">
    public ResponseEntity<?> unasignZoneGarage(GarageDao garageRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.    
        try {
            //Verificación si vino un dni de dueño nuevo          
      
            Optional<Garage> garage = garageRepository.findById(garageRequest.getId());
            garage.get().setZone(null);
            garageRepository.save(garage.get());
            return ResponseEntity.ok("Liberado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update garage"}, Locale.US));
        }    
    }
    // </editor-fold >  
    
// <editor-fold defaultstate="collapsed" desc="asignVehicleGarage()">
    public ResponseEntity<?> asignVehicleGarage(GarageDao garageRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        try {
         

            
            //Verificación si vino un dni de dueño nuevo
            
            
            Optional<Vehicle> vehicle = vehicleService.getByPlate(garageRequest.getPlate());
            if(vehicle.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo","patente = "+garageRequest.getPlate()}, Locale.US));
            }    

             
            //Optional<VehicleType> type = typeService.getById(garageRequest.getTypeId());
            Optional<Garage> garage = garageRepository.findById(garageRequest.getId());
            garage.get().setVehicle(vehicle.get());
            garage.get().setAssignmentDate(LocalDateTime.now());
            
            if (garage.get().getLength() <= vehicle.get().getLength() 
                || garage.get().getWidth()<= vehicle.get().getWidth()){
                return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.limite-dimensiones", new Object[]{garage.get().getLength(),garage.get().getWidth(), vehicle.get().getLength(),vehicle.get().getWidth()}, Locale.US));
 
            }
            
            Optional<Garage> garageAlreadyInUse = garageRepository.findByVehiclePlate(vehicle.get().getPlate());            
            if(garageAlreadyInUse.isPresent()){
                garageAlreadyInUse.get().setVehicle(null);
            }
            
            if(vehicle.get().getVehicleType().getId() != garage.get().getVehicleType().getId()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.tipos-diferentes", new Object[]{"tipo de zona "+vehicle.get().getVehicleType().getDescription(),"tipo de garage "+garage.get().getVehicleType().getDescription()}, Locale.US));
            }
            
            garageRepository.save(garage.get());
            return ResponseEntity.ok("Vendido");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update garage"}, Locale.US));
        }    
    }
    // </editor-fold >    
     
// <editor-fold defaultstate="collapsed" desc="unasignVehicleGarage()">
    public ResponseEntity<?> unasignVehicleGarage(GarageDao garageRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.    
        try {
            //Verificación si vino un dni de dueño nuevo          
      
            Optional<Garage> garage = garageRepository.findById(garageRequest.getId());
            garage.get().setVehicle(null);
            garage.get().setAssignmentDate(null);
            garageRepository.save(garage.get());
            return ResponseEntity.ok("Liberado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update garage"}, Locale.US));
        }    
    }
    // </editor-fold >    
 
// <editor-fold defaultstate="collapsed" desc="deleteGarage()">
    public ResponseEntity<?> deleteGarage(Integer id) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        
        try {
         
            Optional<Garage> garage = garageRepository.findById(id);           
    
            if(garage.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo","id = "+id}, Locale.US));
            }
            
            garageRepository.delete(garage.get());
            return ResponseEntity.ok(messageSource.getMessage("ok.entity.es.delete", new Object[]{"Garage"," Id = "+garage.get().getId()}, Locale.US));
        } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update vehiculo"}, Locale.US));
        } 
    }    
    // </editor-fold>
    
// <editor-fold defaultstate="collapsed" desc="findAll()">
    //@Override
    public ResponseEntity<?> findAll() {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            List<Garage> listGarage = garageRepository.findAll();
            List<GarageDto> listGarageDto = new ArrayList<>();

            for (Garage garage : listGarage) {
                listGarageDto.add(mapGarageToGarageDto(garage));
            }
            return ResponseEntity.ok(listGarageDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Find All Garage"}, Locale.US));
        }
    }    
    // </editor-fold>

// <editor-fold defaultstate="collapsed" desc="findAll()">
    //@Override
    public ResponseEntity<?> findGaragesByOwnerDni(Integer ownerDni) {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            List<Garage> listGarage = garageRepository.findByOwnerDni(ownerDni);
            List<GarageDto> listGarageDto = new ArrayList<>();

            for (Garage garage : listGarage) {
                listGarageDto.add(mapGarageToGarageDto(garage));
            }
            return ResponseEntity.ok(listGarageDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Find All Garage"}, Locale.US));
        }
    }    
    // </editor-fold>

    
// <editor-fold defaultstate="collapsed" desc="findByPlate()">
    //@Override
    public ResponseEntity<?> findByPlate(String plate) {
        //        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            System.out.println(plate);
            Optional<Garage> garage = garageRepository.findByVehiclePlate(plate);
            System.out.println(garage);
            if(garage.isPresent()){
                return ResponseEntity.ok(mapGarageToGarageDto(garage.get()));
            }else{
                //return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehiculo no encontrado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo",plate}, Locale.US));
            }            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Error"}, Locale.US));
        }
    }
    // </editor-fold>
    
// <editor-fold defaultstate="collapsed" desc="findGarageByPlate()">
    //@Override
    public Optional<Garage> findGarageByPlate(String plate) {
        //        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.

        System.out.println(plate);
        Optional<Garage> garage = garageRepository.findByVehiclePlate(plate);
        System.out.println(garage);
        return garage;
    }
    // </editor-fold>

// <editor-fold defaultstate="collapsed" desc="findByOwnerDni()">
//    @Override
    public ResponseEntity<?> findByGarageOwnerDni(Integer ownerDni) {        
        //        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            List<Garage> listGarage = garageRepository.findByOwnerDni(ownerDni);
            List<GarageDto> listGarageDto = new ArrayList<>();

            for (Garage garage : listGarage) {
                listGarageDto.add(mapGarageToGarageDto(garage));
            }
            //return ResponseEntity.ok(listGarageDto);
            
            if(!listGarageDto.isEmpty()){
                return ResponseEntity.ok(listGarageDto);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Garage",ownerDni}, Locale.US));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Find By Id"}, Locale.US));
        }
    }
    
// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="findByOwnerDni()">
//    @Override
    public ResponseEntity<?> findByGarageOwnerDniList(Integer ownerDni) {        
        //        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
            List<Garage> listGarage = garageRepository.findByOwnerDni(ownerDni);
            List<GarageDto> listGarageDto = new ArrayList<>();

            for (Garage garage : listGarage) {
                listGarageDto.add(mapGarageToGarageDto(garage));
            }
            //return ResponseEntity.ok(listGarageDto);
            
            return ResponseEntity.ok(listGarageDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Find By Id"}, Locale.US));
        }
    }
    
// </editor-fold>

    
// <editor-fold defaultstate="collapsed" desc="findByVehicleOwnerDni()">
//    @Override
//    public ResponseEntity<?> findByVehicleOwnerDni(Integer vehicleOwnerDni) {        
//        //        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
//        try {
//            Optional<Garage> garage = garageRepository.findByVehicleOwnerDni(vehicleOwnerDni);
//            
//            if(garage.isPresent()){
//                return ResponseEntity.ok(mapGarageToGarageDto(garage.get()));
//            }else{
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Vehiculo",vehicleOwnerDni}, Locale.US));
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Find By Id"}, Locale.US));
//        }
//    }    
// </editor-fold>
    
//  <editor-fold defaultstate="collapsed" desc="serchGarage()">
    //@Override
    public ResponseEntity<?> serchGarage(String plate, Integer vehicleOwnerDni, Integer garageOwnerDni){

//        if(vehicleOwnerDni != null){
//            return findByVehicleOwnerDni(vehicleOwnerDni);
//        }
        
        if(garageOwnerDni != null){
            return findByGarageOwnerDni(garageOwnerDni);
        }
        
        if(plate != null && plate != ""){
            return findByPlate(plate);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageSource.getMessage("error.entity.es.bad-request", new Object[]{"Patente", "Dni dueño"}, Locale.US));
    }    
    // </editor-fold>    
    
    
    
//MAPPERS
    
// <editor-fold defaultstate="collapsed" desc="mapGarageToGarageDto()">
    public GarageDto mapGarageToGarageDto (Garage garage){
        GarageDto garageDto = new GarageDto();
        garageDto.setId(garage.getId());
        garageDto.setLightMeter(garage.getLightMeter());
        garageDto.setMaintenance(garage.isMaintenance());
        garageDto.setAssignmentDate(garage.getAssignmentDate());
        garageDto.setSaleDate(garage.getSaleDate());
        garageDto.setWidth(garage.getWidth());
        garageDto.setLength(garage.getLength());
        if(garage.getZone()!= null) garageDto.setZone(zoneService.mapZoneToZoneDto(garage.getZone()));
        if(garage.getVehicle()!= null) garageDto.setVehicle(vehicleService.mapVehicleToVehicleDto(garage.getVehicle()));
        if(garage.getOwner()!= null) garageDto.setOwner(userService.mapUserToUserPartnerDto(garage.getOwner()));
        if(garage.getVehicle()!= null) garageDto.setVehicle(vehicleService.mapVehicleToVehicleDto(garage.getVehicle()));
        garageDto.setVehicleType(garage.getVehicleType());
        
        return garageDto;
    }
    
    // </editor-fold> Vehicle -> VehicleDto

}
