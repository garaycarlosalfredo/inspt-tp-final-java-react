/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.dto;

import com.inspt.AdministracionGarageFinal.model.Role;
import lombok.*;

/**
 *
 * @author garay
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserAdminDto extends UserDto{

    private Integer dni;

    public UserAdminDto(Integer id, Integer dni, String email, String phone, String Speciality, String firstName, String lastName, Role role) {
        super(id, dni, email, phone, Speciality, firstName, lastName, role);
    } 
    
}
