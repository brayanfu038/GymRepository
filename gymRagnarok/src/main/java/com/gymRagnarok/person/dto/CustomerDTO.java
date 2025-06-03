package com.gymRagnarok.person.dto;

import java.time.LocalDate;
import java.util.List;

import com.gymRagnarok.person.domain.TypeId;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CustomerDTO {

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

        // Campos de Customer
        private Float  weight;
        private Float  stature;
        private Long anamnesisId;
        private Long trainingPlanId;

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

        public Float  getWeight() {
            return weight;
        }

        public void setWeight(Float  weight) {
            this.weight = weight;
        }

        public Float  getStature() {
            return stature;
        }

        public void setStature(Float  stature) {
            this.stature = stature;
        }

        public Long getAnamnesisId() {
            return anamnesisId;
        }

        public void setAnamnesisId(Long anamnesisId) {
            this.anamnesisId = anamnesisId;
        }

        public Long getTrainingPlanId() {
            return trainingPlanId;
        }

        public void setTrainingPlanId(Long trainingPlanId) {
            this.trainingPlanId = trainingPlanId;
        }
    }

    public static class Response {
        // Campos de Person
        private Long identificationNumber;
        private String names;
        private String lastNames;
        private String typeId;
        private LocalDate dateBirth;
        private String numberPhone;

        // Campos de Customer
        private Float  weight;
        private Float  stature;
        private Long anamnesisId;
        private Long trainingPlanId;
        private List<Long> trainingSessionIds;

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

        public Float  getWeight() {
            return weight;
        }

        public void setWeight(Float  weight) {
            this.weight = weight;
        }

        public Float  getStature() {
            return stature;
        }

        public void setStature(Float  stature) {
            this.stature = stature;
        }

        public Long getAnamnesisId() {
            return anamnesisId;
        }

        public void setAnamnesisId(Long anamnesisId) {
            this.anamnesisId = anamnesisId;
        }

        public Long getTrainingPlanId() {
            return trainingPlanId;
        }

        public void setTrainingPlanId(Long trainingPlanId) {
            this.trainingPlanId = trainingPlanId;
        }

        public List<Long> getTrainingSessionIds() {
            return trainingSessionIds;
        }

        public void setTrainingSessionIds(List<Long> trainingSessionIds) {
            this.trainingSessionIds = trainingSessionIds;
        }
    }
}