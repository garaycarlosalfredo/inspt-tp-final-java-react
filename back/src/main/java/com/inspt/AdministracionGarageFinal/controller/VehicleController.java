/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.controller;

import com.inspt.AdministracionGarageFinal.dto.UserAdminDto;
import com.inspt.AdministracionGarageFinal.dto.UserDto;
import com.inspt.AdministracionGarageFinal.dto.UserEmployeeDto;
import com.inspt.AdministracionGarageFinal.dto.UserPartnerDto;
import com.inspt.AdministracionGarageFinal.dao.VehicleDao;
import com.inspt.AdministracionGarageFinal.service.TypeService;
import com.inspt.AdministracionGarageFinal.service.UserService;
import com.inspt.AdministracionGarageFinal.service.VehicleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
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
@Tag(name = "Vehicle")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/vehicle")
@AllArgsConstructor
public class VehicleController {
  
    @Autowired     
    VehicleService vehicleService;
    
    @Autowired
    TypeService typeService;

    
    @Operation(summary="Obtiene una lista de vehiculos",description = "Obtiene la lista de todos los vehiculos en la guardería")    @ApiResponses(value = {
    		@ApiResponse(responseCode = "200",description = "Se obtibo la lista de vehiculos sin problemas"),
    		@ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/list")
    public ResponseEntity<?> getVehicleList() {
        return vehicleService.findAll();
    }
    
    @Operation(summary="Obtiene una lista de vehiculos de un dueño",description = "Obtiene la lista de todos los vehiculos en la guardería")    @ApiResponses(value = {
    		@ApiResponse(responseCode = "200",description = "Se obtibo la lista de vehiculos sin problemas"),
    		@ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/ownerVehicles/{ownerDni}")
    public ResponseEntity<?> getVehicleListByOwner(@PathVariable Integer ownerDni) {
        return vehicleService.findByOwnerDniList(ownerDni);
    }

    @Operation(summary="Obtiene una lista de los tipos de vehiculos",description = "Obtiene la lista de todos los tipos de vehiculos en la guardería")    @ApiResponses(value = {
    		@ApiResponse(responseCode = "200",description = "Se obtibo la lista de tipo de vehiculos sin problemas"),
    		@ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/type-list")
    public ResponseEntity<?> getTypeVehicleList() {
        return typeService.findAll();
    }
    
    @Operation(summary="Busqueda de un vehiculo",description = "Busca un auto dentro de la guardería por la petente, dni del dueño, etc..")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Vehiculo encontrado"),
        @ApiResponse(responseCode = "400", description = "Error en la petición del vehiculo"),
        @ApiResponse(responseCode = "404", description = "El vehiculo buscado no fué encontrado"),
        @ApiResponse(responseCode = "409", description = "Error interno al intentar buscar el vehiculo")})
    @PostMapping(path = "/serch")
    public ResponseEntity<?> getVehicleByPlate(            
            @RequestParam (required = false) String plate,
            @RequestParam(required = false) Integer ownerDni
        ) {
        return vehicleService.serchVehicle(plate, ownerDni);
    }
    
    @PostMapping(path = "/car")
    @Operation(summary="Agregar un vehiculo",description = "Busca un auto dentro de la guardería por la petente, dni del dueño")    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se agregó el vehiculos sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> createVehicle(@RequestBody VehicleDao vehicleRequest) {
        return vehicleService.createVehicle(vehicleRequest);
    }
    
    @PutMapping(path = "/car/{id}")
    @Operation(summary="Modificar un vehiculo",description = "Busca un auto dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se agregó el vehiculos sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> updateVehicle(@PathVariable("id") Integer id, @RequestBody VehicleDao vehicleRequest) {
        return vehicleService.updateVehicle(id,vehicleRequest);
    }
    
    @DeleteMapping(path = "/car/{id}")
    @Operation(summary="Eliminar un vehiculo",description = "Elimina un vehiculo por su Id")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se eliminó el vehiculos sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> deleteVehicle(@PathVariable("id") Integer id) {
        return vehicleService.deleteVehicle(id);
    }
}
