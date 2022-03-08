/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.dao;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 *
 * @author garay
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginDao {
    @Schema(description = "email del usuario", example = "admin@mail.com")
    private String email;
	
    @Schema(description = "passwore del usuario", example = "admin")
    private String password;
}
