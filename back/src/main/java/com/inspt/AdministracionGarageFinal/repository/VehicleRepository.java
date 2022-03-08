/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.repository;

import com.inspt.AdministracionGarageFinal.model.Vehicle;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author garay
 */
@Repository
public interface VehicleRepository extends JpaRepository <Vehicle, Integer>{
    public Optional<Vehicle> findById(Integer id);
    public List<Vehicle> findAll();
    public Optional<Vehicle> findByPlate(String plate);
    public List<Vehicle> findByOwnerDni(Integer dni);
}
