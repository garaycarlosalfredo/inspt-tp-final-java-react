/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.repository;

import com.inspt.AdministracionGarageFinal.model.Garage;
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
public interface GarageRepository extends JpaRepository <Garage, Integer>{
    public Optional<Garage> findById(Integer id);
    public List<Garage> findAll();
    
//    public Optional<Garage> findByVehicleOwnerDni(Integer dni);
    public Optional<Garage> findByVehiclePlate(String plate);
    public List<Garage> findByOwnerDni(Integer dni);
    public List<Garage> findByZoneId(Integer id);
    public List<Garage> findByZoneLetter(char letter);
}
