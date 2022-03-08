/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.config;

import com.inspt.AdministracionGarageFinal.model.Role;
import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.VehicleType;
import com.inspt.AdministracionGarageFinal.repository.RoleRepository;
import com.inspt.AdministracionGarageFinal.repository.UserRepository;
import com.inspt.AdministracionGarageFinal.repository.VehicleTypeRepository;
import com.inspt.AdministracionGarageFinal.util.ERole;
import com.inspt.AdministracionGarageFinal.util.EVehicleType;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 *
 * @author garay
 */

@Component
public class DbInit implements InitializingBean{
 @Autowired
    UserRepository userRepository;
    
    @Autowired
    RoleRepository roleRepository;
    
    @Autowired
    VehicleTypeRepository vehicleTypeRepository;
    
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @PostConstruct
    public void postConstruct() {
        if (roleRepository.findAll().size() == 0) {            
            Role roleAdmin = new Role(null,ERole.ROLE_ADMIN.name(), "Administrador");
            Role rolePartner = new Role(null,ERole.ROLE_ADMIN.ROLE_PARTNER.name(), "Socio");
            Role roleEmployee = new Role(null,ERole.ROLE_ADMIN.ROLE_EMPLOYEE.name(), "Empleado");
            
            roleRepository.save(roleAdmin);
            roleRepository.save(rolePartner);
            roleRepository.save(roleEmployee);
        }  
        
        if (vehicleTypeRepository.findAll().size() == 0) { 
      
            VehicleType motorhomes = new VehicleType(null,EVehicleType.MOTORHOMES.name(), "MotorHomes");
            VehicleType casaRodante = new VehicleType(null,EVehicleType.CASAS_RODANTES.name(), "Casa rodante");
            VehicleType caravana = new VehicleType(null,EVehicleType.CARAVANAS.name(), "Caravana");
            VehicleType trailer = new VehicleType(null,EVehicleType.TRAILERS.name(), "Trailer");
            
            vehicleTypeRepository.save(motorhomes);
            vehicleTypeRepository.save(casaRodante);
            vehicleTypeRepository.save(caravana);
            vehicleTypeRepository.save(trailer);
        } 
        
         if (userRepository.findAll().size() == 0) {            
            Optional<Role> role=  roleRepository.findByName(ERole.ROLE_ADMIN.ROLE_ADMIN.name());  
            User admin = new User();
                    admin.setId(null);            
                    admin.setPassword(bCryptPasswordEncoder.encode("admin"));
                    admin.setLastName("administrador inicial");
                    admin.setFirstName("usuario inicial");
                    admin.setRole(role.get());
                    admin.setPhone("15-0000-0000");
                    admin.setEmail("admin@mail.com");
                    admin.setDni((Integer) 99999999);
                    admin.setSpecialty("Main Admin");
            userRepository.save(admin);
        }       
    }      
    
    @Override
    public void afterPropertiesSet() throws Exception {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
   
}
