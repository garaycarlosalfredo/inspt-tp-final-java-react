/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.model;

import java.time.LocalDateTime;
import java.util.Collection;
import javax.persistence.*;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
//Spring Security
import org.springframework.security.core.userdetails.UserDetails;

/**
 *
 * @author garay
 */
@Entity(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data

public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    //Usuario
    @NotNull(message = "El email no puede estar vacío")
    @Email(message = "email no válido")
    @Column(unique = true)
    private String email;    
    
    //Contraseña
    @NotNull(message = "El contraseña no puede estar vacío")
    private String password;
    
    //Nombre
    @NotNull(message = "El nombre no puede estar vacío")
    private String firstName;

    //Apellido
    @NotNull(message = "El apellido no puede estar vacío")
    private String lastName;
    
    //Teléfono
    @NotNull(message = "El teléfono no puede estar vacío")
    private String phone;
    
    @Nullable
    private String specialty;
 
    @JoinColumn(name = "role", referencedColumnName = "id")
    @ManyToOne
    private Role role;

    @NotNull(message = "El dni no puede estar vacío")
    @Column(unique = true)
    private Integer dni;
    
    @UpdateTimestamp
    private LocalDateTime createdAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.        
        return null;
    }

    @Override
    public String getPassword() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        return this.password;
    }

    @Override
    public String getUsername() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        return true;
    }

    @Override
    public boolean isEnabled() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        return true;
    }
}
