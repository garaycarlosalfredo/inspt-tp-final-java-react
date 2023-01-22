/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.model;

import java.security.Timestamp;
import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import lombok.*;

/**
 *
 * @author garay
 */
@Entity(name = "role")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Role {
    	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty(message = "Name can not be empty")
    @Column(nullable = false, length = 50)
    private String name;

    private String description;

}
