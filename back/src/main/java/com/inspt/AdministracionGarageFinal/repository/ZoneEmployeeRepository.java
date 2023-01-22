/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.repository;

import com.inspt.AdministracionGarageFinal.model.Vehicle;
import com.inspt.AdministracionGarageFinal.model.Zone;
import com.inspt.AdministracionGarageFinal.model.ZoneEmployee;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author garay
 */
@Repository
public interface ZoneEmployeeRepository extends JpaRepository <ZoneEmployee, Integer>{
    public Optional<ZoneEmployee> findById(Integer id);
    public List<ZoneEmployee> findAll();
    public List<ZoneEmployee>findByemployeeAsignedEmployeeId(String employeeId);
    public Optional<ZoneEmployee>findByemployeeAsignedEmployeeIdAndZoneAsignedId(String employeeId, Integer zoneId);
    public List<ZoneEmployee>findByZoneAsignedId(Integer zoneId);
}
