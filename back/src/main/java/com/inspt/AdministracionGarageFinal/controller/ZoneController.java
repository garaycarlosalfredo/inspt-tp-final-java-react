/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.controller;

import com.inspt.AdministracionGarageFinal.dao.ZoneDao;
import com.inspt.AdministracionGarageFinal.dao.GarageDao;
import com.inspt.AdministracionGarageFinal.dto.UserAdminDto;
import com.inspt.AdministracionGarageFinal.dto.UserDto;
import com.inspt.AdministracionGarageFinal.dto.UserEmployeeDto;
import com.inspt.AdministracionGarageFinal.dto.UserPartnerDto;
import com.inspt.AdministracionGarageFinal.dao.VehicleDao;
import com.inspt.AdministracionGarageFinal.service.GarageService;
import com.inspt.AdministracionGarageFinal.service.UserService;
import com.inspt.AdministracionGarageFinal.service.VehicleService;
import com.inspt.AdministracionGarageFinal.service.ZoneEmployeeService;
import com.inspt.AdministracionGarageFinal.service.ZoneService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import javax.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author garay
 */
@Tag(name = "Zone")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/zones")
@AllArgsConstructor
public class ZoneController {
  
    @Autowired     
    ZoneService zoneService;
    
    @Autowired
    ZoneEmployeeService zoneEmployeeService;
    
    @Operation(summary="Obtiene una lista de Zonas",description = "Obtiene la lista de todos las zonas en la guardería")    @ApiResponses(value = {
    		@ApiResponse(responseCode = "200",description = "Se obtibo la lista de zona sin problemas"),
    		@ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/list")
    public ResponseEntity<?> getZoneList() {
        return zoneService.findAll();
    }
    
//    @Operation(summary="Obtiene una lista de Garage",description = "Obtiene la lista de todos las zonas en la guardería")    @ApiResponses(value = {
//    		@ApiResponse(responseCode = "200",description = "Se obtibo la lista de zona sin problemas"),
//    		@ApiResponse(responseCode = "400", description = "the fields required are missing ")})
//    @GetMapping(path = "/listZoneEmployee")
//    public ResponseEntity<?> getZoneEmployeeList() {
//        return zoneEmployeeService.findAll();
//    }
//    
//       @Operation(summary="Obtiene una lista de Garage",description = "Obtiene la lista de todos las zonas en la guardería")    @ApiResponses(value = {
//    		@ApiResponse(responseCode = "200",description = "Se obtibo la lista de zona sin problemas"),
//    		@ApiResponse(responseCode = "400", description = "the fields required are missing ")})
//    @GetMapping(path = "/listZoneEmployeeId")
//    public ResponseEntity<?> getZoneEmployeeList(@RequestParam String id) {
//        return ResponseEntity.ok(zoneEmployeeService.serchZoneEmployeByEmployeeId(id));
//    } 
//    
    @Operation(summary="Busqueda de una zona por la Letra",description = "Busca una zona dentro de la guardería por la letra")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "zona encontrado"),
        @ApiResponse(responseCode = "400", description = "Error en la petición de la zona"),
        @ApiResponse(responseCode = "404", description = "La zona buscada no fué encontrada"),
        @ApiResponse(responseCode = "409", description = "Error interno al intentar buscar el garage")})
    @PostMapping(path = "/serch")
    public ResponseEntity<?> getZoneByLetter(            
            @RequestParam (required = true) char letter
        ) {
        return zoneService.serchZone(letter);
    }
    
    @PostMapping(path = "/zone")
    @Operation(summary="Crea una Zona",description = "Agregar una zona")    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se agregó la zona sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> createZone(@RequestBody ZoneDao zoneDao) {
        return zoneService.createZone(zoneDao);
    }
    
    @PutMapping(path = "/zoneUpdate")
    @Operation(summary="Modificar una zona",description = "Modificar los datos de una zona")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó la zona sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> updateZone(@RequestBody ZoneDao zoneDao) {
        return zoneService.updateZone(zoneDao);
    }
    
    @DeleteMapping(path = "/zone/{id}")
    @Operation(summary="Eliminar una zona",description = "Elimina una zona por su Id")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se eliminó el garage correctamente"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> deleteZone(@PathVariable("id") Integer id) {
        return zoneService.deleteZone(id);
    }
}
