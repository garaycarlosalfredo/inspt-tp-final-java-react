/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service.iservice;

import com.inspt.AdministracionGarageFinal.dao.LoginDao;
import com.inspt.AdministracionGarageFinal.dao.RegistrationDao;
import com.inspt.AdministracionGarageFinal.dto.UserDto;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author garay
 */
public interface IAuthService {
    ResponseEntity<?> register(RegistrationDao request);
    ResponseEntity<?> login(LoginDao loginRequest);
    UserDto findByEmail(String email);
    LoginDao createLoginRequest(RegistrationDao reqModel); 
}
