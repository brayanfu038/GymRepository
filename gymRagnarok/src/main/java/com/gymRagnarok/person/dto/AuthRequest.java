package com.gymRagnarok.person.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
    @NotBlank(message = "Usuario requerido") 
    String username,  
    
    @NotBlank(message = "Contraseña requerida") 
    String password
) {}