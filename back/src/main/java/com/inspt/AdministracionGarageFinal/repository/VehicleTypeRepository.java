/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.repository;

import com.inspt.AdministracionGarageFinal.model.Role;
import com.inspt.AdministracionGarageFinal.model.VehicleType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author garay
 */
@Repository
public interface VehicleTypeRepository extends JpaRepository<VehicleType, Integer>{    
    public Optional<VehicleType> findById(Integer id);  
    public Optional<VehicleType> findByName(String name);  
}
