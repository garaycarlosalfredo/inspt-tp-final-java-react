/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
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
@Entity(name = "userEmployee")
@PrimaryKeyJoinColumn(name = "userId")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data

public class UserEmployee extends User{

    private String employeeId;
   
}
