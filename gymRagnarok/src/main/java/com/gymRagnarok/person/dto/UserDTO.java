package com.gymRagnarok.person.dto;

import jakarta.validation.constraints.NotBlank;
import java.io.Serializable;

public class UserDTO {
    public static class Request implements Serializable {
        @NotBlank(message = "El nombre de usuario es obligatorio")
        private String username;

        @NotBlank(message = "La contraseña es obligatoria")
        private String password;

        // Getters y Setters

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }


         }
}