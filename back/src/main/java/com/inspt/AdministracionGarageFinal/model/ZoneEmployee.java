/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.*;

/**
 *
 * @author garay
 */
@Entity(name = "zoneEmployee")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class ZoneEmployee {    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    private Integer id;
    
    @NotNull(message = "El usuario no puede estar vacío")
    @JoinColumn(name = "employeeAsigned", referencedColumnName = "userId")
    @OneToOne
    private UserEmployee employeeAsigned;    

    @NotNull(message = "La zona no puede estar vacío")
    @JoinColumn(name = "zoneAsigned", referencedColumnName = "id")
    @OneToOne
    private Zone zoneAsigned;
    
    private Integer carsAsignedNumber;//Cantidad de autos asignados a la zona
}
