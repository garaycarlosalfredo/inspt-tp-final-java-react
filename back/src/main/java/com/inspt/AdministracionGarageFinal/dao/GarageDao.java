/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.dao;

import com.inspt.AdministracionGarageFinal.model.User;
import com.inspt.AdministracionGarageFinal.model.Vehicle;
import com.inspt.AdministracionGarageFinal.model.Zone;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.*;
import org.springframework.lang.Nullable;

/**
 *
 * @author garay
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class GarageDao {
    
    @Schema(description = "id del garage", example = "1")
    @Nullable
    private Integer id;
    
    @Schema(description = "valor del contador de luz", example = "0.0")
    @Nullable
    private float lightMeter;
    
    @Schema(description = "valor que indica si cuenta con mantenimiento", example = "false")
    @Nullable
    private Integer maintenance;    

    @Schema(description = "patente del vehiculo", example = "ABC123")
    @Nullable
    private String plate;
 
    @Schema(description = "dueño del garage", example = "31200000")
    @Nullable
    private Integer ownerDni;
    
    @Schema(description = "Tipo de vehiculos del garage", example = "1")
    @NotNull
    private Integer typeId;    

    @Schema(description = "Zona del garage", example = "1")
    @NotNull
    private Integer zoneId;  
    
    @Schema(description = "ancho del garage", example = "3.0")
    @NotNull(message = "El ancho del garage tiene que ser conocido")
    private float width;
    
    @Schema(description = "largo del garage", example = "6.0")
    @NotNull(message = "El largo del garage tiene que ser conocido")
    private float length; 
}
