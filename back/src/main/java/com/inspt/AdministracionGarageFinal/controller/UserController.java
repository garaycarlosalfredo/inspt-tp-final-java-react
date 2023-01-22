/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.controller;

import com.inspt.AdministracionGarageFinal.dao.ZoneEmployeeDao;
import com.inspt.AdministracionGarageFinal.dto.UserAdminDto;
import com.inspt.AdministracionGarageFinal.dto.UserDto;
import com.inspt.AdministracionGarageFinal.dto.UserEmployeeDto;
import com.inspt.AdministracionGarageFinal.dto.UserPartnerDto;
import com.inspt.AdministracionGarageFinal.model.Role;
import com.inspt.AdministracionGarageFinal.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import jdk.jfr.BooleanFlag;
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
@Tag(name = "Users")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/user")
@AllArgsConstructor
public class UserController {
  
    @Autowired     
    UserService userService;

    @GetMapping(path = "/userList")
    @Operation(summary="Obtiene la lista de usuarios",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    public List<UserDto> getUserList() {
        return userService.findAllUsers();
    }
    @Operation(summary="Obtiene la lista de usuarios empleados",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/employeeList")
    public List<UserEmployeeDto> getUserEmployeeList(){
        return userService.findAllEmployee();
    }
    
    @Operation(summary="Obtiene la lista de usuarios socios",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/partnerList")
    public List<UserPartnerDto> getUserPartnerList(){
        return userService.findAllPartner();
    }
    
    @Operation(summary="Obtiene la lista de usuarios administradores",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @GetMapping(path = "/adminList")
    public List<UserAdminDto> getUserAdminList(){
        return userService.findAllAdmin();
    }
    
    
    @Operation(summary="Elimina un usuario",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id){

        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    //update User
    
    @Operation(summary="Modifica un usuario",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})
    @PutMapping("/{id}/update")
    public ResponseEntity updateUser(@PathVariable long id, @RequestBody UserDto userDto){
    
        try {
            System.out.println(userDto);
            userService.updateUser(userDto);
            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            return ResponseEntity.ok("No ok");
        }
    }
    
    
    //update User
    
    @Operation(summary="Obtiene la lista de roles del sistema",description = "Busca un garage dentro de la guardería por la petente, dni del dueño")    
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",description = "Se modificó el garage sin problemas"),
        @ApiResponse(responseCode = "400", description = "the fields required are missing ")})    
    @GetMapping(path = "/roleList")
    public List<Role> getList() {
        return userService.findAllRoles();
    }
    
    

//    @PatchMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Object> updateUser(@PathVariable ("id") Long id, @ModelAttribute UserRequest user){
//        try{
//            return new ResponseEntity<>(UserService.updateUser(id, user), HttpStatus.OK);
//        }
//        catch (Exception e){
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }  
}
