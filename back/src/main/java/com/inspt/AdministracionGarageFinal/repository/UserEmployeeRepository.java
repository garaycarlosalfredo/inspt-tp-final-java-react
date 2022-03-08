/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.repository;

import com.inspt.AdministracionGarageFinal.model.Role;
import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.UserEmployee;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author garay
 */
@Repository
public interface UserEmployeeRepository extends JpaRepository <UserEmployee, Integer>{
    public List<UserEmployee> findAll();
    public List<UserEmployee> findByRoleName(String roleName);
    public Optional<UserEmployee> findByEmail(String email);
    public Optional<UserEmployee> findByDni(Integer dni);
}
