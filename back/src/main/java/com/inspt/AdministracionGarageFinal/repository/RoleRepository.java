/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.repository;

import com.inspt.AdministracionGarageFinal.model.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author garay
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>{  
    public Optional<Role> findByName(String name);  
}
