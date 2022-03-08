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
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class UserDto {
    private Integer id;
    private Integer dni;
    private String email;
    private String phone;
    private String Speciality;
    private String firstName;
    private String lastName;
    private Role role;   
}
