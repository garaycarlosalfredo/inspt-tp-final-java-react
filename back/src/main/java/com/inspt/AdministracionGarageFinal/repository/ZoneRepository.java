/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.repository;

import com.inspt.AdministracionGarageFinal.model.Vehicle;
import com.inspt.AdministracionGarageFinal.model.Zone;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author garay
 */
@Repository
public interface ZoneRepository extends JpaRepository <Zone, Integer>{
    public Optional<Zone> findById(Integer id);
    public List<Zone> findAll();
    public Optional<Zone>findByLetter(char letter);
}
