/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.service;

import com.inspt.AdministracionGarageFinal.dao.ZoneEmployeeDao;
import com.inspt.AdministracionGarageFinal.dao.RegistrationDao;
import com.inspt.AdministracionGarageFinal.dto.UserAdminDto;
import com.inspt.AdministracionGarageFinal.dto.UserDto;
import com.inspt.AdministracionGarageFinal.dto.UserEmployeeDto;
import com.inspt.AdministracionGarageFinal.dto.UserPartnerDto;
import com.inspt.AdministracionGarageFinal.dto.ZoneDto;
import com.inspt.AdministracionGarageFinal.dto.ZoneEmployeeDto;
import com.inspt.AdministracionGarageFinal.mappers.Mappers;
import com.inspt.AdministracionGarageFinal.model.Role;
import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.UserEmployee;
import com.inspt.AdministracionGarageFinal.model.Zone;
import com.inspt.AdministracionGarageFinal.model.ZoneEmployee;
import com.inspt.AdministracionGarageFinal.repository.RoleRepository;
import com.inspt.AdministracionGarageFinal.repository.UserEmployeeRepository;
import com.inspt.AdministracionGarageFinal.repository.UserRepository;
import com.inspt.AdministracionGarageFinal.repository.ZoneEmployeeRepository;
import com.inspt.AdministracionGarageFinal.repository.ZoneRepository;
import com.inspt.AdministracionGarageFinal.service.iservice.iUserService;
import com.inspt.AdministracionGarageFinal.util.ERole;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import javax.validation.ConstraintViolationException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author garay
 */
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService, iUserService{
    
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserEmployeeRepository userEmployeeRepository;
    
    @Autowired
    ZoneEmployeeRepository zoneEmployeeRepository;
    
    @Autowired
    ZoneEmployeeService zoneEmployeeService;
    
    @Autowired
    ZoneRepository zoneRepository;
        
    @Autowired
    RoleRepository roleRepository;
        
    @Autowired
    MessageSource messageSource;
    
    
    // <editor-fold defaultstate="collapsed" desc="signUpUser()">
    public ResponseEntity<?> signUpUser(RegistrationDao registrationRequest) {
        try {            
        Optional<Role> role =  roleRepository.findById(registrationRequest.getRoleId());
        System.out.println(role);
        if(role.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.not-found-id", new Object[]{"Rol","id = "+registrationRequest.getRoleId()}, Locale.US));
        }
        
        ResponseEntity<?> response = null;
                
        if(role.get().getName().equals(ERole.ROLE_EMPLOYEE.name())){
            UserEmployee user = new UserEmployee();
            user.setEmail(registrationRequest.getEmail());
            user.setPassword(registrationRequest.getPassword());
            user.setFirstName(registrationRequest.getFirstName());
            user.setLastName(registrationRequest.getLastName());
            user.setPhone(registrationRequest.getPhone()); 
            user.setSpecialty(registrationRequest.getSpecialty()); 
            user.setRole(role.get());
            user.setDni(registrationRequest.getDni());
            user.setEmployeeId("E-"+registrationRequest.getDni());
            String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);                        
            userEmployeeRepository.save(user);
            return ResponseEntity.ok(user);
                    
        }else{
        
            User user = new User(
                    null,//Id
                    registrationRequest.getEmail(),
                    registrationRequest.getPassword(),
                    registrationRequest.getFirstName(),
                    registrationRequest.getLastName(),
                    registrationRequest.getPhone(), 
                    registrationRequest.getSpecialty(), 
                    role.get(),
                    registrationRequest.getDni(),
                    null //Created At                
            );
            String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);                        
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
            
            
            
        } catch (DataIntegrityViolationException  e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage("error.entity.es.Duplicate-entry", new Object[]{"email"+registrationRequest.getEmail(),"dni = "+registrationRequest.getDni()}, Locale.US));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(messageSource.getMessage("error.entity.es.internal", new Object[]{"Registrar usuario"}, Locale.US));
        }
    }    
    // </editor-fold> Registrar usuario
        
    // <editor-fold defaultstate="collapsed" desc="loadUserByUsername()">
    //Metodo del userDetailsService
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        String userNotFoundMsg = messageSource.getMessage("user.not.found", new Object[]{"User"}, Locale.US);
        Optional<User> user = userRepository.findByEmail(email);
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(user.get().getRole().getName()));
        try {
            return new org.springframework.security.core.userdetails.User(user.get().getEmail(), user.get().getPassword(), authorities);
        } catch (Exception e) {
            throw new UsernameNotFoundException(userNotFoundMsg);
        }
    }
    
    // </editor-fold> Buscar usuario por el parámetro tomado como userName (SpringSecurity)
     
    // <editor-fold defaultstate="collapsed" desc="getUserByDni(Integer dni)">
    public Optional<User> getUserByDni(Integer dni) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
        String userNotFoundMsg = messageSource.getMessage("user.not.found", new Object[]{"User"}, Locale.US);
        Optional<User> user = userRepository.findByDni(dni);
        try {
            return user;
        } catch (Exception e) {
            throw new UsernameNotFoundException(userNotFoundMsg);
        }
    }
    
    // </editor-fold> Buscar usuario por el parámetro tomado como userName (SpringSecurity)
    
    // <editor-fold defaultstate="collapsed" desc="getUserByDni(Integer dni)">
    public Optional<UserEmployee> getEmployeebyId(Integer id) {
        return userEmployeeRepository.findById(id);
    }
    
    // </editor-fold> Buscar usuario por el parámetro tomado como userName (SpringSecurity)
     
    
    // <editor-fold defaultstate="collapsed" desc="findAllUsers()">
    @Override
    public List<UserDto> findAllUsers() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    
    
        List<User> listUser = userRepository.findAll();
        List<UserDto> listUserDTO = new ArrayList<>();

        for (User user : listUser) {
            
            UserDto userDto = mapUserToUserDto(user);
            
//            UserDto userDto = new UserDto();
//            userDto.setId(user.getId());
//            userDto.setDni(user.getDni());
//            userDto.setPhone(user.getPhone());
//            userDto.setFirstName(user.getFirstName());
//            userDto.setLastName(user.getLastName());
//            userDto.setEmail(user.getEmail());            
//            userDto.setSpeciality(user.getSpecialty());
//            userDto.setRole(user.getRole());
            listUserDTO.add(userDto);
        }

        return listUserDTO;
    }

    // </editor-fold>
                          
    // <editor-fold defaultstate="collapsed" desc="findAllPartner()">
    @Override
    public List<UserPartnerDto> findAllPartner() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        List<User> listUser = userRepository.findByRoleName(ERole.ROLE_PARTNER.name());
        List<UserPartnerDto> listUserPartnerDTO = new ArrayList<>();

        
        for (User user : listUser) {
            UserPartnerDto userPartnerDTO = mapUserToUserPartnerDto(user);
            listUserPartnerDTO.add(userPartnerDTO);
        }
        
//        listUserPartnerDTO = listUser.stream().map(new Function<User, UserPartnerDto>() {
//                                                @Override
//                                                public UserPartnerDto apply(User u) {
//                                                    return new UserPartnerDto(
//                                                            u.getId(),
//                                                            u.getDni(), 
//                                                            u.getFirstName(), 
//                                                            u.getLastName(), 
//                                                            u.getEmail(), 
//                                                            u.getRole()
//                                                    );
//                                                }
//                                            }
//        ).collect(Collectors.toList());
        
        
        return listUserPartnerDTO;
    }

    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="findAllAdmin()">
    @Override
    public List<UserAdminDto> findAllAdmin(){
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        List<User> listUser = userRepository.findByRoleName(ERole.ROLE_ADMIN.name());
        List<UserAdminDto> listUserAdminDTO = new ArrayList<>();

        for (User user : listUser) {
            UserAdminDto userAdminDto = mapUserToUserAdminDto(user);
            listUserAdminDTO.add(userAdminDto);
        }
        
//        listUserAdminDTO = listUser.stream().map(new Function<User, UserAdminDto>() {
//                                                @Override
//                                                public UserAdminDto apply(User u) {
//                                                    return new UserAdminDto(
//                                                            u.getId(),
//                                                            u.getDni(), 
//                                                            u.getFirstName(), 
//                                                            u.getLastName(), 
//                                                            u.getEmail(), 
//                                                            u.getRole()
//                                                    );
//                                                }
//                                            }
//        ).collect(Collectors.toList());


        return listUserAdminDTO;
    }

    // </editor-fold>    
    
    // <editor-fold defaultstate="collapsed" desc="softDeleteUser()">
    @Override
    public String softDeleteUser(long id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    // </editor-fold>   
    
    // <editor-fold defaultstate="collapsed" desc="deleteUser()">
    public ResponseEntity<?> deleteUser(Integer id) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        User user = userRepository.getById(id);

        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }    
        
        if(user.getRole().getName().equalsIgnoreCase(ERole.ROLE_EMPLOYEE.name())){            
            try {
                UserEmployee userEmployee = userEmployeeRepository.getById(id);
                zoneEmployeeService.deleteAllZoneEmployeeOfEmployee(userEmployee.getEmployeeId());//Borra todas las zonas asignadas al usuario
                userEmployeeRepository.delete(userEmployee);//Borra el usuario de de la tabla de usuarios y empleado
                return ResponseEntity.ok(id);                
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No se pudo eliminar el usuario");                
            }
        }else{            
            try {
                //Ver que hay que eliminar
                //zoneEmployeeService.deleteAllZoneEmployeeOfEmployee(userEmployee.getEmployeeId());//Borra todas las zonas asignadas al usuario
                userRepository.delete(user);//Borra el usuario de de la tabla de usuarios y empleado
                return ResponseEntity.ok(id);                
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No se pudo eliminar el usuario");                
            }
        }        
    }
    // </editor-fold>   
    
    // <editor-fold defaultstate="collapsed" desc="getAuthentication()">
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
    // </editor-fold>
    
    //[Employee]
 
    
    // <editor-fold defaultstate="collapsed" desc="findAllEmployee()">
    @Override
    public List<UserEmployeeDto> findAllEmployee() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
//        List<User> listUser = userRepository.findByRoleName(ERole.ROLE_EMPLOYEE.name());
        List<UserEmployee>listUserEmployee = userEmployeeRepository.findAll();
        List<UserEmployeeDto> listUserEmployeeDTO = new ArrayList<>();
        
        for (UserEmployee userEmployee : listUserEmployee) {
            List<ZoneDto>listZoneEmployee = zoneEmployeeService.serchZoneEmployeByEmployeeId(userEmployee.getEmployeeId());
            UserEmployeeDto userEmployeeDto = new UserEmployeeDto();
            userEmployeeDto.setId(userEmployee.getId());
            userEmployeeDto.setZoneEmployee(listZoneEmployee);
            userEmployeeDto.setFirstName(userEmployee.getFirstName());
            userEmployeeDto.setLastName(userEmployee.getLastName());
            userEmployeeDto.setEmail(userEmployee.getEmail());
            userEmployeeDto.setRole(userEmployee.getRole());
            userEmployeeDto.setEmployeeId(userEmployee.getEmployeeId());
            userEmployeeDto.setPhone(userEmployee.getPhone());
            userEmployeeDto.setSpeciality(userEmployee.getSpecialty());
            
            listUserEmployeeDTO.add(userEmployeeDto);
        }
  
//        listUserEmployeeDTO = listUser.stream().map(new Function<User, UserEmployeeDto>() {
//                                                @Override
//                                                public UserEmployeeDto apply(User u) {
//                                                    return new UserEmployeeDto(
//                                                            u.getId(), 
//                                                            u.getFirstName(), 
//                                                            u.getLastName(), 
//                                                            u.getEmail(), 
//                                                            u.getRole()
//                                                    );
//                                                }
//                                            }
//        ).collect(Collectors.toList());


        return listUserEmployeeDTO;
    }

    // </editor-fold>
    
    
    //
    public ResponseEntity<?> updateUser(UserDto userDto){
        try {
            User user = userRepository.getById(userDto.getId());
            
            if(user == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }
            
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setEmail(userDto.getEmail());
            user.setPhone(userDto.getPhone());
            user.setSpecialty(userDto.getSpeciality());
            userRepository.save(user);
            
            return ResponseEntity.ok(userDto);
            
        } catch (Exception e) {
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno");
        }
    }
    
    //[ROLES]
    public List<Role> findAllRoles (){
        return roleRepository.findAll();
    }

    //MAPPERS
    
    // <editor-fold defaultstate="collapsed" desc="mapUserToUserDto()">
    public UserDto mapUserToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setDni(user.getDni());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        userDto.setPhone(user.getPhone());
        userDto.setSpeciality(user.getSpecialty());
        return userDto;
    }
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mapUserToUserPartnerDto()">
    public UserPartnerDto mapUserToUserPartnerDto(User user){        
        UserPartnerDto userPartnerDto = new UserPartnerDto();
        userPartnerDto.setId(user.getId());
        userPartnerDto.setDni(user.getDni());
        userPartnerDto.setFirstName(user.getFirstName());
        userPartnerDto.setLastName(user.getLastName());
        userPartnerDto.setEmail(user.getEmail());
        userPartnerDto.setRole(user.getRole());
        userPartnerDto.setPhone(user.getPhone());
        return userPartnerDto;
    }
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mapUserToUserAdminDto()">
    public UserAdminDto mapUserToUserAdminDto(User user){
        UserAdminDto userAdminDto = new UserAdminDto();        
        userAdminDto.setId(user.getId());
        userAdminDto.setDni(user.getDni());
        userAdminDto.setFirstName(user.getFirstName());
        userAdminDto.setLastName(user.getLastName());
        userAdminDto.setEmail(user.getEmail());
        userAdminDto.setRole(user.getRole());
        return userAdminDto;
    }
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mapZoneEmployeeToZoneEmployeeDto ()">
    public ZoneEmployeeDto mapZoneEmployeeToZoneEmployeeDto (ZoneEmployee ze){
        ZoneEmployeeDto zoneEmployeeDto = new ZoneEmployeeDto();
        zoneEmployeeDto.setId(ze.getEmployeeAsigned().getId());
        zoneEmployeeDto.setEmployeeId(ze.getEmployeeAsigned().getEmployeeId());
        zoneEmployeeDto.setZoneId(ze.getZoneAsigned().getId());
        zoneEmployeeDto.setZoneLetter(ze.getZoneAsigned().getLetter());
        return zoneEmployeeDto;
    }
    
    // </editor-fold> Vehicle -> VehicleDto
}
