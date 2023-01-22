/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service.iservice;

import com.inspt.AdministracionGarageFinal.dto.UserAdminDto;
import com.inspt.AdministracionGarageFinal.dto.UserDto;
import com.inspt.AdministracionGarageFinal.dto.UserEmployeeDto;
import com.inspt.AdministracionGarageFinal.dto.UserPartnerDto;
import com.inspt.AdministracionGarageFinal.model.Role;
import com.inspt.AdministracionGarageFinal.model.User;
import java.util.List;

/**
 *
 * @author garay
 */
public interface iUserService {
    List<UserDto> findAllUsers();
    List<UserEmployeeDto> findAllEmployee();
    List<UserPartnerDto> findAllPartner();
    List<UserAdminDto> findAllAdmin();
    String softDeleteUser(long id);
    //User updateUser(Long id, UserRequest user);
}
