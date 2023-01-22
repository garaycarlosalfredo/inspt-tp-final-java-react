/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.dto;

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
public class MyInfoResponse {
    private Integer id;
    private Integer dni;
    private String roleDescription;  
    private String firstName;
    private String lastName;
    private String email; 
    private String phone; 
    private String employeCode;
    private String specialty;
}
