/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service;

import com.inspt.AdministracionGarageFinal.dao.ZoneDao;
import com.inspt.AdministracionGarageFinal.dao.ZoneEmployeeDao;
import com.inspt.AdministracionGarageFinal.dto.VehicleDto;
import com.inspt.AdministracionGarageFinal.dao.VehicleDao;
import com.inspt.AdministracionGarageFinal.dto.ZoneDto;
import com.inspt.AdministracionGarageFinal.dto.ZoneEmployeeDto;
import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.UserEmployee;
import com.inspt.AdministracionGarageFinal.model.Vehicle;
import com.inspt.AdministracionGarageFinal.model.VehicleType;
import com.inspt.AdministracionGarageFinal.model.Zone;
import com.inspt.AdministracionGarageFinal.model.ZoneEmployee;
import com.inspt.AdministracionGarageFinal.repository.UserEmployeeRepository;
import com.inspt.AdministracionGarageFinal.repository.UserRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleTypeRepository;
import com.inspt.AdministracionGarageFinal.repository.ZoneEmployeeRepository;
import com.inspt.AdministracionGarageFinal.repository.ZoneRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
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
public class ZoneEmployeeService {
    

    @Autowired
    ZoneRepository zoneRepository;
    
    @Autowired
    UserEmployeeRepository userEmployeeRepository;
    
    @Autowired
    ZoneEmployeeRepository zoneEmployeeRepository;    
   
    @Autowired
    MessageSource messageSource;

    
   
    // <editor-fold defaultstate="collapsed" desc="assignZoneToEmployee()">
    //@Override
    public ResponseEntity<?> assignZoneToEmployee(ZoneEmployeeDao zoneEmployeeDao) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        
        try {
         
            Optional<UserEmployee> employee = userEmployeeRepository.findById(zoneEmployeeDao.getEmployeeId());
            if(employee.isEmpty()){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"empleado","id  = "+zoneEmployeeDao.getEmployeeId()}, Locale.US));}  
            
            Optional<ZoneEmployee>zoneEmploye = zoneEmployeeRepository.findByemployeeAsignedEmployeeIdAndZoneAsignedId(employee.get().getEmployeeId(), zoneEmployeeDao.getZoneId());
            if(zoneEmploye.isPresent()){
                return ResponseEntity.status(HttpStatus.IM_USED).body(messageSource.getMessage("error.entity.es.Duplicate-entry", new Object[]{"zona ","id  = "+zoneEmployeeDao.getZoneId()}, Locale.US));
            } 
            
            Optional<Zone>zone = zoneRepository.findById(zoneEmployeeDao.getZoneId());
            if(zone.isEmpty()){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"zona","id  = "+zoneEmployeeDao.getZoneId()}, Locale.US));}
                        
            ZoneEmployee asignationZoneEmployee = new ZoneEmployee();
            if(zoneEmployeeDao.getCarsAsignedNumber()>zone.get().getCarsQuantity()){return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(messageSource.getMessage("error.entity.es.bad-value", new Object[]{"cantidad asignada "+zoneEmployeeDao.getCarsAsignedNumber()," autos en zona "+zone.get().getCarsQuantity()}, Locale.US));}
            
            asignationZoneEmployee.setEmployeeAsigned(employee.get());
            asignationZoneEmployee.setZoneAsigned(zone.get());
            asignationZoneEmployee.setCarsAsignedNumber(zoneEmployeeDao.getCarsAsignedNumber());
            
            zoneEmployeeRepository.save(asignationZoneEmployee);            
            return ResponseEntity.ok( mapZoneEmployeeToZoneEmployeeDto(asignationZoneEmployee));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"crear zona"}, Locale.US));
        }
    }
    
    // </editor-fold>
        
    // <editor-fold defaultstate="collapsed" desc="updateAssignZoneToEmployee()">
    //@Override
    public ResponseEntity<?> updateAssignZoneToEmployee(Integer id, ZoneEmployeeDao zoneEmployeeDao) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        
        try {
            
            Optional<ZoneEmployee>zoneEmploye = zoneEmployeeRepository.findById(id);
            if(zoneEmploye.isEmpty()){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.Duplicate-entry", new Object[]{"Asignación de zona a empleado ","id  = "+zoneEmployeeDao.getZoneId()}, Locale.US));} 
            
            Optional<UserEmployee> employee = userEmployeeRepository.findById(zoneEmployeeDao.getEmployeeId());
            if(employee.isEmpty()){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"empleado","id  = "+zoneEmployeeDao.getEmployeeId()}, Locale.US));}  
         
            Optional<Zone>zone = zoneRepository.findById(zoneEmployeeDao.getZoneId());          
            if(zone.isEmpty()){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"zona","id  = "+zoneEmployeeDao.getZoneId()}, Locale.US));}
            
            zoneEmploye.get().setEmployeeAsigned(employee.get());
            zoneEmploye.get().setZoneAsigned(zone.get());
            
            UserEmployee ue = employee.get();
            zoneEmployeeRepository.save(zoneEmploye.get());            
            return ResponseEntity.ok( mapZoneEmployeeToZoneEmployeeDto(zoneEmploye.get()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"crear zona"}, Locale.US));
        }
    }
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="deleteZoneEmployee()">
    public ResponseEntity<?> deleteZoneEmployee(Integer id) {
       try {
            Optional<ZoneEmployee> zoneEmployee = zoneEmployeeRepository.findById(id);
            if(zoneEmployee.isEmpty()){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Asignación zona a empleado","id = "+id}, Locale.US));}
            
            zoneEmployeeRepository.delete(zoneEmployee.get());
            return ResponseEntity.ok(messageSource.getMessage("ok.entity.es.delete", new Object[]{"Asignación ", "id = "+zoneEmployee.get().getId()}, Locale.US));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Update vehiculo"}, Locale.US));
        } 
    }    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="deleteAllZoneEmployeeOfEmployee()">
    public ResponseEntity<?> deleteAllZoneEmployeeOfEmployee(String employeeId) {
       try {
            
           
            List<ZoneEmployee>listZoneEmployee = zoneEmployeeRepository.findByemployeeAsignedEmployeeId(employeeId);
        
            for (ZoneEmployee zoneEmployee : listZoneEmployee) {
               zoneEmployeeRepository.delete(zoneEmployee);
           }
            
            return ResponseEntity.ok(messageSource.getMessage("ok.entity.es.delete", new Object[]{"Asignación ", "employee id = "+ employeeId}, Locale.US));
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
            List<ZoneEmployee>listZoneEmployee = zoneEmployeeRepository.findAll();
            List<ZoneEmployeeDto>listZoneEmployeeDto = new ArrayList<>();
            for (ZoneEmployee zoneEmployee : listZoneEmployee) {
//                ZoneEmployeeDto ze = new ZoneEmployeeDto();
//                ze.setId(zoneEmployee.getId());
//                ze.setUserId(zoneEmployee.getEmployeeAsigned().getId());
//                ze.setEmployeeId(zoneEmployee.getEmployeeAsigned().getEmployeeId());
//                ze.setZoneId(zoneEmployee.getZoneAsigned().getId());
//                ze.setZoneLetter(zoneEmployee.getZoneAsigned().getLetter());
                listZoneEmployeeDto.add(mapZoneEmployeeToZoneEmployeeDto(zoneEmployee));
            }
            return ResponseEntity.ok(listZoneEmployeeDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal=", new Object[]{"Find All"}, Locale.US));
        }
    }    
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="serchZoneEmployeByEmployeeId()">
    //@Override
    public List<ZoneDto> serchZoneEmployeByUserId(Integer userId){
        UserEmployee userEmployee = userEmployeeRepository.getById(userId);
        List<ZoneEmployee>listZoneEmployee = zoneEmployeeRepository.findByemployeeAsignedEmployeeId(userEmployee.getEmployeeId());
        List<ZoneDto>listZoneDto = new ArrayList<>();
        for (ZoneEmployee zoneEmployee : listZoneEmployee) {
            listZoneDto.add(mapZoneEmployeeToZoneDto(zoneEmployee));
        }

        return listZoneDto;
    }    
    // </editor-fold>   
        // <editor-fold defaultstate="collapsed" desc="serchZoneEmployeByEmployeeId()">
    //@Override
    public List<ZoneDto> serchZoneEmployeByEmployeeId(String employeeId){
        List<ZoneEmployee>listZoneEmployee = zoneEmployeeRepository.findByemployeeAsignedEmployeeId(employeeId);
        List<ZoneDto>listZoneDto = new ArrayList<>();
        for (ZoneEmployee zoneEmployee : listZoneEmployee) {
            listZoneDto.add(mapZoneEmployeeToZoneDto(zoneEmployee));
        }

        return listZoneDto;
    }    
    // </editor-fold>  
    
    // <editor-fold defaultstate="collapsed" desc="getById()">
    public Optional<ZoneEmployee> getById(Integer id) {
    //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.        
        return zoneEmployeeRepository.findById(id);
    }
// </editor-fold>
    
    
    //MAPPERS
    
    // <editor-fold defaultstate="collapsed" desc="mapZoneEmployeeToZoneDto()">
    public ZoneDto mapZoneEmployeeToZoneDto (ZoneEmployee ze){
        ZoneDto zoneDto = new ZoneDto();
                zoneDto.setId(ze.getZoneAsigned().getId());
                zoneDto.setLetter(ze.getZoneAsigned().getLetter());
                zoneDto.setVehicleQuantity(ze.getCarsAsignedNumber());
                zoneDto.setVehicleType(ze.getZoneAsigned().getVehicleType());
        return zoneDto;
    }
    
    // </editor-fold> Vehicle -> VehicleDto
    
    // <editor-fold defaultstate="collapsed" desc="mapZoneEmployeeToZoneEmployeeDto ()">
    public ZoneEmployeeDto mapZoneEmployeeToZoneEmployeeDto (ZoneEmployee ze){
        ZoneEmployeeDto zoneEmployeeDto = new ZoneEmployeeDto();
        zoneEmployeeDto.setId(ze.getId());
        zoneEmployeeDto.setUserId(ze.getEmployeeAsigned().getId());
        zoneEmployeeDto.setEmployeeId(ze.getEmployeeAsigned().getEmployeeId());
        zoneEmployeeDto.setZoneId(ze.getZoneAsigned().getId());
        zoneEmployeeDto.setZoneLetter(ze.getZoneAsigned().getLetter());
        zoneEmployeeDto.setCarsAsignedNumber(ze.getCarsAsignedNumber());
        return zoneEmployeeDto;
    }
    
    // </editor-fold> Vehicle -> VehicleDto

    public ResponseEntity<?> findZoneEmployee(Integer employeeId, Integer zoneId) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        try {
         
            Optional<UserEmployee> employee = userEmployeeRepository.findById(employeeId);
            if(employee.isEmpty()){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"empleado","id  = "+employeeId}, Locale.US));}  
            
            Optional<ZoneEmployee>zoneEmploye = zoneEmployeeRepository.findByemployeeAsignedEmployeeIdAndZoneAsignedId(employee.get().getEmployeeId(), zoneId);
            if(zoneEmploye.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.Duplicate-entry", new Object[]{"zona ","id  = "+zoneId}, Locale.US));
            } 
            return ResponseEntity.ok( mapZoneEmployeeToZoneEmployeeDto(zoneEmploye.get()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"crear zona"}, Locale.US));
        }
    }

}
