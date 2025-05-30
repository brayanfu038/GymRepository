package com.gymRagnarok.person.dto;

import jakarta.validation.constraints.NotNull;

import java.util.Set;

public class RoleDTO {

    public static class Request {
        @NotNull(message = "El tipo de rol es obligatorio")
        private String type;

        @NotNull(message = "Los permisos son obligatorios")
        private Set<String> permissions;

        // Getters y Setters
        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Set<String> getPermissions() {
            return permissions;
        }

        public void setPermissions(Set<String> permissions) {
            this.permissions = permissions;
        }
    }

    public static class Response {
        private Long id;
        private String type;
        private Set<String> permissions;

        // Getters y Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Set<String> getPermissions() {
            return permissions;
        }

        public void setPermissions(Set<String> permissions) {
            this.permissions = permissions;
        }
    }
}