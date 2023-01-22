/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service;

import com.inspt.AdministracionGarageFinal.dao.ZoneDao;
import com.inspt.AdministracionGarageFinal.dto.VehicleDto;
import com.inspt.AdministracionGarageFinal.dao.VehicleDao;
import com.inspt.AdministracionGarageFinal.dto.ZoneDto;
import com.inspt.AdministracionGarageFinal.model.Garage;
import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.Vehicle;
import com.inspt.AdministracionGarageFinal.model.VehicleType;
import com.inspt.AdministracionGarageFinal.model.Zone;
import com.inspt.AdministracionGarageFinal.model.ZoneEmployee;
import com.inspt.AdministracionGarageFinal.repository.GarageRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleTypeRepository;
import com.inspt.AdministracionGarageFinal.repository.ZoneEmployeeRepository;
import com.inspt.AdministracionGarageFinal.repository.ZoneRepository;
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
public class ZoneService {
    
    @Autowired
    ZoneRepository zoneRepository;
    
    @Autowired
    VehicleService vehicleServicery;
    
    @Autowired
    UserService userService;
    
    @Autowired
    TypeService typeService;
    
    @Autowired
    ZoneEmployeeRepository zoneEmployeeRepository;
    
    @Autowired
    GarageRepository garageRepository;
        
    @Autowired
    MessageSource messageSource;

    
// <editor-fold defaultstate="collapsed" desc="createZone()">
    //@Override
    public ResponseEntity<?> createZone(ZoneDao zoneDao) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        
        try {
         
            Optional<VehicleType> vehicleType = typeService.getById(zoneDao.getVehicleTypeId());
            
           if(vehicleType.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Type","id  = "+zoneDao.getVehicleTypeId()}, Locale.US));
            }   
            Zone zone = new Zone();
            zone.setLetter(zoneDao.getLetter());
            zone.setVehicleType(vehicleType.get());
            zone.setLength(zoneDao.getLength());
            zone.setWidth(zoneDao.getWidth());
            zone.setCarsQuantity(zoneDao.getCarsQuantity());
            zoneRepository.save(zone);
            return ResponseEntity.ok(mapZoneToZoneDto(zone));
        } catch (DataIntegrityViolationException  e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.Duplicate-entry", new Object[]{"letra "+zoneDao.getLetter(),"tipo id= "+zoneDao.getVehicleTypeId()}, Locale.US));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"crear zona"}, Locale.US));
        }
    }
    
    // </editor-fold>
   
// <editor-fold defaultstate="collapsed" desc="updatezone()">
    public ResponseEntity<?> updateZone(ZoneDao zoneDao) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        try {
         
            Optional<VehicleType> type = typeService.getById(zoneDao.getVehicleTypeId());
            Optional<Zone> zone = zoneRepository.findById(zoneDao.getId());
                      
            if(zone.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"zona no encontrada","lettra = "+zoneDao.getLetter()}, Locale.US));
            }
            if(type.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Tipo de vehiculo","Id = "+zoneDao.getVehicleTypeId()}, Locale.US));
            }            
            
            zone.get().setLetter(zoneDao.getLetter());
            zone.get().setVehicleType(type.get());
            zone.get().setLength(zoneDao.getLength());
            zone.get().setWidth(zoneDao.getWidth());
            zone.get().setCarsQuantity(zoneDao.getCarsQuantity());
            
            zoneRepository.save(zone.get());
            return ResponseEntity.ok(mapZoneToZoneDto(zone.get()));
        } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update zona"}, Locale.US));
        }    
    }
    // </editor-fold >
    
// <editor-fold defaultstate="collapsed" desc="deleteZone()">
    public ResponseEntity<?> deleteZone(Integer id) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        
        try {
         
            Optional<Zone> zone = zoneRepository.findById(id);           
    
            if(zone.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Zona","id = "+id}, Locale.US));
            }
            
            List<ZoneEmployee> listadoEmpleadosZonas = zoneEmployeeRepository.findByZoneAsignedId(id);
            
            for (ZoneEmployee listadoEmpleadosZona : listadoEmpleadosZonas) {
                zoneEmployeeRepository.delete(listadoEmpleadosZona);
            }
            
            List<Garage> listaGarages = garageRepository.findByZoneId(id);
            
            for (Garage garage : listaGarages) {
                garage.setZone(null);
                garageRepository.save(garage);
            }
            
            
            zoneRepository.delete(zone.get());
            return ResponseEntity.ok(messageSource.getMessage("ok.entity.es.delete", new Object[]{"lettra "+zone.get().getLetter()," id = "+zone.get().getId()}, Locale.US));
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
            List<Zone> listZone = zoneRepository.findAll();
            List<ZoneDto> listZoneDto = new ArrayList<>();

            for (Zone zone : listZone) {
                listZoneDto.add(mapZoneToZoneDto(zone));
            }
            return ResponseEntity.ok(listZoneDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal=", new Object[]{"Find All"}, Locale.US));
        }
    }    
    // </editor-fold>

// <editor-fold defaultstate="collapsed" desc="serchZone()">
    //@Override
    public ResponseEntity<?> serchZone(char letter){
        
        Optional<Zone> zone = zoneRepository.findByLetter(letter);
        if(zone.isEmpty())return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.not-found", new Object[]{"Zona"}, Locale.US));
        
        return ResponseEntity.ok(mapZoneToZoneDto(zone.get()));
    }    
    // </editor-fold>    
    
    public Optional<Zone> getById(Integer typeId) {
    //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.        
    return zoneRepository.findById(typeId);
    }
    
    //MAPPERS
    
    // <editor-fold defaultstate="collapsed" desc="mapVehicleToVehicleDto()">
    public ZoneDto mapZoneToZoneDto (Zone zone){
        ZoneDto zoneDto = new ZoneDto();
                zoneDto.setId(zone.getId());
                zoneDto.setLetter(zone.getLetter());
                zoneDto.setCarsQuantity(zone.getCarsQuantity());
                zoneDto.setVehicleType(zone.getVehicleType());
                zoneDto.setVehicleQuantity(zone.getCarsQuantity());
                zoneDto.setWidth(zone.getWidth());
                zoneDto.setLength(zone.getLength());
        return zoneDto;
    }
    
    // </editor-fold> Vehicle -> VehicleDto

}
