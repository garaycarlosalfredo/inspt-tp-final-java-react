/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.dto;

import com.inspt.AdministracionGarageFinal.model.Role;
import com.inspt.AdministracionGarageFinal.model.ZoneEmployee;
import java.util.List;
import lombok.*;

/**
 *
 * @author garay
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserEmployeeDto extends UserDto{

    private String employeeId;
   
    private List<ZoneDto> zoneEmployee;

    
   
    public UserEmployeeDto(String employeeId, List<ZoneDto> zoneEmployee, Integer id, Integer dni, String email, String phone, String Speciality, String firstName, String lastName, Role role) {
        super(id, dni, email, phone, Speciality, firstName, lastName, role);
        this.employeeId = employeeId;
        this.zoneEmployee = zoneEmployee;
    }
    
    
}
