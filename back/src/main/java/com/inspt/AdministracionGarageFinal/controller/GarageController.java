/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.controller;

import com.inspt.AdministracionGarageFinal.dao.GarageDao;
import com.inspt.AdministracionGarageFinal.dto.UserAdminDto;
import com.inspt.AdministracionGarageFinal.dto.UserDto;
import com.inspt.AdministracionGarageFinal.dto.UserEmployeeDto;
import com.inspt.AdministracionGarageFinal.dto.UserPartnerDto;
import com.inspt.AdministracionGarageFinal.dao.VehicleDao;
import com.inspt.AdministracionGarageFinal.service.GarageService;
import com.inspt.AdministracionGarageFinal.service.UserService;
import com.inspt.AdministracionGarageFinal.service.VehicleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.*;
import org.springframework.data.repository.query.Param;
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
@Tag(name = "Garage")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/garages")
@AllArgsConstructor
public class GarageController {
  
    @Autowired     
    GarageService garageService;

    
    @Operation(summary="Obtiene una lista de Garages",description = "Obtiene la lista de todos los garages en la guardería")    @ApiResponses(value = {
    		@ApiResponse(responseCode = "200",description = "Se obtibo la lista de garages sin problemas"),
    		@ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/list")
    public ResponseEntity<?> getGarageList() {
        return garageService.findAll();
    }
    
    @Operation(summary="Obtiene una lista de Garage de un socio",description = "Obtiene la lista de todos los garages en la guardería")    @ApiResponses(value = {
    		@ApiResponse(responseCode = "200",description = "Se obtibo la lista de garages sin problemas"),
    		@ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/list/{ownerDni}")
    public ResponseEntity<?> getGarageListByOwner(@PathVariable Integer ownerDni) {
        return garageService.findByGarageOwnerDniList(ownerDni);
    }
    
    @Operation(summary="Busqueda de un garage opr la metricula del auto asignado",description = "Busca un auto dentro de la guardería por la petente, dni del dueño, etc..")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Garage encontrado"),
        @ApiResponse(responseCode = "400", description = "Error en la petición del garage"),
        @ApiResponse(responseCode = "404", description = "El garage buscado no fué encontrado"),
        @ApiResponse(responseCode = "409", description = "Error interno al intentar buscar el garage")})
    @PostMapping(path = "/serch")
    public ResponseEntity<?> getVehicleByPlate(            
            @RequestParam (required = false) String plate,
            @RequestParam(required = false) Integer garageOwnerDni,
            @RequestParam(required = false) Integer vehicleOwnerDni
        ) {
        return garageService.serchGarage(plate,vehicleOwnerDni, garageOwnerDni);
    }
    
    @PostMapping(path = "/garage")
    @Operation(summary="Crea un Garage",description = "Busca un auto dentro de la guardería por la petente, dni del dueño")    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se agregó el vehiculos sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> createVehicle(@RequestBody GarageDao garageRequest) {
        return garageService.createGarage(garageRequest);
    }
    
    @PutMapping(path = "/garage/{id}")
    @Operation(summary="Modificar un garage",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> updateVehicle(@PathVariable("id") Integer id, @RequestBody GarageDao garageRequest) {
        return garageService.updateGarage(id,garageRequest);
    }
    
    @PutMapping(path = "/asignOwner/{id}")
    @Operation(summary="Asigna un socio a un garage",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> asignOwnerGarage(@PathVariable("id") Integer id, @RequestBody GarageDao garageRequest) {
        return garageService.asignedOwnerGarage(id,garageRequest);
    }
    
    @PutMapping(path = "/unasignOwner/{id}")
    @Operation(summary="Liberar el garage",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> unasignOwnerGarage(@PathVariable("id") Integer id) {
        return garageService.unasignedOwnerGarage(id);
    }
   
    @PutMapping(path = "/asignVehicle")
    @Operation(summary="Asigna un vehiculo a un garage",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> asignVehicleGarage(@RequestBody GarageDao garageRequest) {
        return garageService.asignVehicleGarage(garageRequest);
    }
    
    @PutMapping(path = "/unasignVehicle")
    @Operation(summary="Quita un vehiculo a un garage",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> unasignVehicleGarage(@RequestBody GarageDao garageRequest) {
        return garageService.unasignVehicleGarage(garageRequest);
    }
    
    @PutMapping(path = "/asignZone")
    @Operation(summary="Asigna una zona a un garage",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> asignZoneGarage(@RequestBody GarageDao garageRequest) {
        return garageService.asignZoneGarage(garageRequest);
    }
    
    @PutMapping(path = "/unasignZone")
    @Operation(summary="Quita la zona a un garage",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> unasignZoneGarage(@RequestBody GarageDao garageRequest) {
        return garageService.unasignZoneGarage(garageRequest);
    }
    
    @DeleteMapping(path = "/garage/{id}")
    @Operation(summary="Eliminar un garage",description = "Elimina un garage por su Id")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se eliminó el garage correctamente"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public ResponseEntity<?> deleteVehicle(@PathVariable("id") Integer id) {
        return garageService.deleteGarage(id);
    }
}
