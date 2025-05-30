package com.gymRagnarok.person.dto;

import com.gymRagnarok.person.domain.TypeId;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class UserDTO {

    public static class Request {
        // Campos de Person
        @NotNull(message = "El número de identificación es obligatorio")
        private Long identificationNumber;

        @NotNull(message = "Los nombres son obligatorios")
        @Size(min = 2, max = 100, message = "Los nombres deben tener entre 2 y 100 caracteres")
        private String names;

        @NotNull(message = "Los apellidos son obligatorios")
        @Size(min = 2, max = 100, message = "Los apellidos deben tener entre 2 y 100 caracteres")
        private String lastNames;

        @NotNull(message = "El tipo de identificación es obligatorio")
        private TypeId typeId;

        private LocalDate dateBirth;

        @Size(max = 20, message = "El número de teléfono no puede exceder 20 caracteres")
        private String numberPhone;

        // Campos de User
        @NotNull(message = "El nombre de usuario es obligatorio")
        @Size(min = 4, max = 50, message = "El nombre de usuario debe tener entre 4 y 50 caracteres")
        private String userName;

        @NotNull(message = "La contraseña es obligatoria")
        @Size(min = 6, max = 100, message = "La contraseña debe tener al menos 6 caracteres")
        private String password;

        @NotNull(message = "El rol es obligatorio")
        private Long roleId;

        // Getters y Setters 

        public Long getIdentificationNumber() {
            return identificationNumber;
        }

        public void setIdentificationNumber(Long identificationNumber) {
            this.identificationNumber = identificationNumber;
        }

        public String getNames() {
            return names;
        }

        public void setNames(String names) {
            this.names = names;
        }

        public String getLastNames() {
            return lastNames;
        }

        public void setLastNames(String lastNames) {
            this.lastNames = lastNames;
        }

        public TypeId getTypeId() {
            return typeId;
        }

        public void setTypeId(TypeId typeId) {
            this.typeId = typeId;
        }

        public LocalDate getDateBirth() {
            return dateBirth;
        }

        public void setDateBirth(LocalDate dateBirth) {
            this.dateBirth = dateBirth;
        }

        public String getNumberPhone() {
            return numberPhone;
        }

        public void setNumberPhone(String numberPhone) {
            this.numberPhone = numberPhone;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public Long getRoleId() {
            return roleId;
        }

        public void setRoleId(Long roleId) {
            this.roleId = roleId;
        }


    }

    public static class Response {
        // Campos de Person
        private Long id;
        private Long identificationNumber;
        private String names;
        private String lastNames;
        private String typeId;
        private LocalDate dateBirth;
        private String numberPhone;

        // Campos de User
        private String userName;
        private Long roleId;
        private LocalDateTime createdDate;
        private boolean active;

        // Getters y Setters

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Long getIdentificationNumber() {
            return identificationNumber;
        }

        public void setIdentificationNumber(Long identificationNumber) {
            this.identificationNumber = identificationNumber;
        }

        public String getNames() {
            return names;
        }

        public void setNames(String names) {
            this.names = names;
        }

        public String getLastNames() {
            return lastNames;
        }

        public void setLastNames(String lastNames) {
            this.lastNames = lastNames;
        }

        public String getTypeId() {
            return typeId;
        }

        public void setTypeId(String typeId) {
            this.typeId = typeId;
        }

        public LocalDate getDateBirth() {
            return dateBirth;
        }

        public void setDateBirth(LocalDate dateBirth) {
            this.dateBirth = dateBirth;
        }

        public String getNumberPhone() {
            return numberPhone;
        }

        public void setNumberPhone(String numberPhone) {
            this.numberPhone = numberPhone;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public Long getRoleId() {
            return roleId;
        }

        public void setRoleId(Long roleId) {
            this.roleId = roleId;
        }

        public LocalDateTime getCreatedDate() {
            return createdDate;
        }

        public void setCreatedDate(LocalDateTime createdDate) {
            this.createdDate = createdDate;
        }

        public boolean isActive() {
            return active;
        }

        public void setActive(boolean active) {
            this.active = active;
        }
    }
}