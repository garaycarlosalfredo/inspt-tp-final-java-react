/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.dao;

import com.inspt.AdministracionGarageFinal.model.Role;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.*;

/**
 *
 * @author garay
 */

@RequiredArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class RegistrationDao {
    @NotNull
    @Schema(description = "nombre del usuario", example = "Carlos")
    private final String firstName;
    
    @NotNull
    @Schema(description = "apellido del usuario", example = "Garay")
    private final String lastName;
    
    @NonNull
    @NotNull
    @Schema(description = "email del usuario", example = "carlos@mail.com")
    private String email;
    
    @NotNull
    @Schema(description = "password del usuario", example = "partner")
    private final String password;
    
    @Schema(description = "rol del usuario", example = "2")
    private Integer roleId;
    
    @Schema(description = "teléfono del usuario", example = "15-1000-0000")
    @NotNull
    private String phone;
    
//    @Schema(description = "código del usuario, si es empleado", example = "E01")
//    @Nullable
//    private String employeCode;
    
    @Schema(description = "especialidad del usuario, si es empleado", example = "Mecánico")
    @Nullable
    private String specialty;
    
    @NotNull
    @Schema(description = "dni del usuario", example = "31200000")
    private Integer dni;
}
