/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.repository;

import com.inspt.AdministracionGarageFinal.model.Role;
import com.inspt.AdministracionGarageFinal.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author garay
 */
@Repository
public interface UserRepository extends JpaRepository <User, Integer>{
    public List<User> findAll();
    public List<User> findByRoleName(String roleName);
    public Optional<User> findByEmail(String email);
    public Optional<User> findByDni(Integer dni);
    public Optional<User> findById(Integer id);
}
