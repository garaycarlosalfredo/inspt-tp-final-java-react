/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service;

import com.inspt.AdministracionGarageFinal.dao.LoginDao;
import com.inspt.AdministracionGarageFinal.dao.RegistrationDao;
import com.inspt.AdministracionGarageFinal.dto.JwtDto;
import com.inspt.AdministracionGarageFinal.dto.UserDto;
import com.inspt.AdministracionGarageFinal.model.Role;
import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.UserEmployee;
import com.inspt.AdministracionGarageFinal.repository.RoleRepository;
import com.inspt.AdministracionGarageFinal.repository.UserRepository;
import com.inspt.AdministracionGarageFinal.service.iservice.IAuthService;
import com.inspt.AdministracionGarageFinal.util.ERole;
import com.inspt.AdministracionGarageFinal.util.JwtUtil;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Locale;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/**
 *
 * @author garay
 */
@Service
@AllArgsConstructor
@Slf4j
public class AuthService implements IAuthService{
    @Autowired
    UserService userService;
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    RoleRepository roleRepository;
    
    @Autowired // Generar en service
    UserRepository userRepository;
    
    @Autowired
    JwtUtil jwtUtil;
    
    @Autowired
    MessageSource messageSource;
    
    // <editor-fold defaultstate="collapsed" desc="register()">
    @Override
    public ResponseEntity<?> register(RegistrationDao registrationRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.

        
        ResponseEntity<?> response = userService.signUpUser(registrationRequest);
        
        if(response.getStatusCode().equals(HttpStatus.OK)){       
            LoginDao loginRequest = this.createLoginRequest(registrationRequest); 
            return this.login(loginRequest);
        }else{
            return response;
        }
    }
// </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="login()">
    @Override
    public ResponseEntity<?> login(LoginDao loginRequest) {
        
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var userReturn = findByEmail(loginRequest.getEmail());
            final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getEmail());
            final String jwt = jwtUtil.generateToken(userDetails);

//            HttpHeaders responseHeaders = new HttpHeaders();
//            responseHeaders.set("jwt",jwt);

            //return new ResponseEntity<>(userReturn, responseHeaders, HttpStatus.OK);
//            return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(userReturn);
            JwtDto response = new JwtDto(jwt);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            String loginErrorMsg = messageSource.getMessage("login.error.es", new Object[]{""}, Locale.US);
            //return new ResponseEntity<>(error + loginErrorMsg, HttpStatus.UNAUTHORIZED);            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(loginErrorMsg);
        }
    }
// </editor-fold>    
    
    // <editor-fold defaultstate="collapsed" desc="findByEmail()">
    @Override
    public UserDto findByEmail(String email) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        
        Optional<User> user = userRepository.findByEmail(email);        
        
        UserDto userDTO = new UserDto();
        if (user != null && user.isPresent()) {
            userDTO.setId(user.get().getId());
            userDTO.setFirstName(user.get().getFirstName());
            userDTO.setLastName(user.get().getLastName());
            userDTO.setEmail(user.get().getEmail());
            userDTO.setPhone(user.get().getPhone());
            userDTO.setRole(user.get().getRole());
            userDTO.setDni(user.get().getDni());
        }
        return userDTO;
    
    }
// </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="createLoginRequest()">
    @Override
    public LoginDao createLoginRequest(RegistrationDao registrationRequest) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        LoginDao loginRequest = new LoginDao();
        loginRequest.setEmail(registrationRequest.getEmail());
        loginRequest.setPassword(registrationRequest.getPassword());
        return loginRequest; 
    }
// </editor-fold>
    
}
