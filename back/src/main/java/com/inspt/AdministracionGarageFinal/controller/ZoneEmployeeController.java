/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.controller;

import com.inspt.AdministracionGarageFinal.dao.ZoneDao;
import com.inspt.AdministracionGarageFinal.dao.ZoneEmployeeDao;
import com.inspt.AdministracionGarageFinal.service.UserService;
import com.inspt.AdministracionGarageFinal.service.ZoneEmployeeService;
import com.inspt.AdministracionGarageFinal.service.ZoneService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author garay
 */
@Tag(name = "ZoneEmployee")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/employee")
@AllArgsConstructor
public class ZoneEmployeeController {
  
    @Autowired     
    ZoneService zoneService;
    
    @Autowired
    ZoneEmployeeService zoneEmployeeService;
    
    @Autowired
    UserService userService;
    
    @PostMapping(path = "/assigneZoneEmployee")
    @Operation(summary="Asignar una zona a un empleado",description = "asignar una zona a un empleado")    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se asignó la zona sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> asignZoneemployee(@RequestBody ZoneEmployeeDao zoneEmployeeDao) {
        return zoneEmployeeService.assignZoneToEmployee(zoneEmployeeDao);
    }
    
    @PutMapping(path = "/assigneZoneEmployee/{id}")
    @Operation(summary="Asignar una zona a un empleado",description = "asignar una zona a un empleado")    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se asignó la zona sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> updateAsignZoneemployee(@PathVariable ("id") Integer id,@RequestBody ZoneEmployeeDao zoneEmployeeDao) {
        return zoneEmployeeService.updateAssignZoneToEmployee(id, zoneEmployeeDao);
    }
    
    @DeleteMapping(path = "/assigneZoneEmployee/{id}")
    @Operation(summary="Eliminar una asignación",description = "Elimina una asignación por su Id")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se eliminó la asignación correctamente"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> deleteAsignZoneemployee(@PathVariable("id") Integer id) {
        return zoneEmployeeService.deleteZoneEmployee(id);
    }
    
    @Operation(summary="Obtiene una lista de Asignaciones",description = "Obtiene la lista de todos las asignaciones en la guardería")    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se obtuvo la lista de asignaciones correctamente"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/assigneZoneEmployee/list")
    public ResponseEntity<?> getZoneEmployeeList() {
        return zoneEmployeeService.findAll();
    }
    
    @Operation(summary="Obtiene una asignacion de un usuario y zona determinada",description = "Obtiene un asignacion de la guardería")    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se obtuvo la asignacion correctamente"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/assigneZoneEmployee")
    public ResponseEntity<?> getZoneEmployeeList(@RequestParam Integer employeeId,@RequestParam Integer zoneId) {
        return zoneEmployeeService.findZoneEmployee(employeeId, zoneId);
    }
       
    @Operation(summary="Obtiene una asignacion de un usuario y zona determinada",description = "Obtiene un asignacion de la guardería")    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se obtuvo la asignacion correctamente"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/assigneZoneEmployee/findZoneOfEmployee/{userId}")
    public ResponseEntity<?> getZonesOfEmployeeList(@PathVariable Integer userId) {
        return ResponseEntity.ok(zoneEmployeeService.serchZoneEmployeByUserId(userId));
    }
}
