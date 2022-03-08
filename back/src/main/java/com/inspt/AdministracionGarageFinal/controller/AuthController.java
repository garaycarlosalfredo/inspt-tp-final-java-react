/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.controller;

import com.inspt.AdministracionGarageFinal.dao.LoginDao;
import com.inspt.AdministracionGarageFinal.dao.RegistrationDao;
import com.inspt.AdministracionGarageFinal.dto.UserDto;
import com.inspt.AdministracionGarageFinal.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.security.Principal;
import java.util.Locale;
import lombok.AllArgsConstructor;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

/**
 *
 * @author garay
 */
@Tag(name = "Authentication")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/auth")
@AllArgsConstructor
public class AuthController {
    
    @Autowired
    private final MessageSource messageSource;
    @Autowired
    private AuthService authService;

    @PostMapping(path = "/sign-up", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary="Crear un usuario",description = "Crea un nuevo usuario")
    @ApiResponses(value = {
    		@ApiResponse(responseCode = "200",description = "el usuario fué creado correctamente"),
    		@ApiResponse(responseCode = "400", description = "alguno de los campos necesario no están correctos")})
    public ResponseEntity<?> register(@RequestBody RegistrationDao registrationRequest) {
        ResponseEntity<?> responseEntity = authService.register(registrationRequest);
        if(responseEntity.getStatusCode().equals(UNAUTHORIZED)){
            return ResponseEntity.status(UNAUTHORIZED).body(responseEntity);
        } else {
            return ResponseEntity.ok(responseEntity);
        }
    }

    @PostMapping(value = "/sign-in")
    @Operation(summary = "Loggin de un usuario", description = "returns if the user can log in or not")
    @ApiResponses(value = {
    		@ApiResponse(responseCode = "200", description = "the user was logged successfully"),
    		@ApiResponse(responseCode = "400", description = "the fields required are missing")
    })
    
    public ResponseEntity<?> login(@RequestBody LoginDao loginRequest) {
//        ResponseEntity<?> responseEntity = authService.login(loginRequest);
//        if(responseEntity.getStatusCode().equals(UNAUTHORIZED)){
//            return ResponseEntity.status(UNAUTHORIZED).body(responseEntity);
//        } else {
//            return ResponseEntity.ok(responseEntity);
//        }
        return authService.login(loginRequest);
    }

    @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Información del usuario logeado", description = "returns all the information of the user")
    @ApiResponse(responseCode = "200", description = "user's data")
    public ResponseEntity<?> getName(Authentication authentication, Principal principal) {
        try {
            UserDto userDto =  authService.findByEmail(authentication.getName());
            return ResponseEntity.ok(userDto);
        }catch( NullPointerException e ){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("error.jwt.noUserAuth", new Object[] { "jwt"}, Locale.US));
        }
    }
}
