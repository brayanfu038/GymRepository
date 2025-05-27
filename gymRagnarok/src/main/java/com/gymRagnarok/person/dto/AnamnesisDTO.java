package com.gymRagnarok.person.dto;

import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public class AnamnesisDTO {

    public static class Request {
        @Size(max = 1000, message = "Las patologías no pueden exceder 1000 caracteres")
        private String pathologies;

        @Size(max = 2000, message = "Las observaciones no pueden exceder 2000 caracteres")
        private String observations;

        private Long previousAnamnesisId;
        private Long customerId;

        // Getters y Setters

        public String getPathologies() {
            return pathologies;
        }

        public void setPathologies(String pathologies) {
            this.pathologies = pathologies;
        }

        public String getObservations() {
            return observations;
        }

        public void setObservations(String observations) {
            this.observations = observations;
        }

        public Long getPreviousAnamnesisId() {
            return previousAnamnesisId;
        }

        public void setPreviousAnamnesisId(Long previousAnamnesisId) {
            this.previousAnamnesisId = previousAnamnesisId;
        }

        public Long getCustomerId() {
            return customerId;
        }

        public void setCustomerId(Long customerId) {
            this.customerId = customerId;
        }
    }

    

    public static class Response {
        private Long id;
        private LocalDate date;
        private String pathologies;
        private String observations;
        private Long previousAnamnesisId;
        private Long customerId;
        private List<Long> followUpIds;

        // Getters y Setters

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public String getPathologies() {
            return pathologies;
        }

        public void setPathologies(String pathologies) {
            this.pathologies = pathologies;
        }

        public String getObservations() {
            return observations;
        }

        public void setObservations(String observations) {
            this.observations = observations;
        }

        public Long getPreviousAnamnesisId() {
            return previousAnamnesisId;
        }

        public void setPreviousAnamnesisId(Long previousAnamnesisId) {
            this.previousAnamnesisId = previousAnamnesisId;
        }

        public Long getCustomerId() {
            return customerId;
        }

        public void setCustomerId(Long customerId) {
            this.customerId = customerId;
        }

        public List<Long> getFollowUpIds() {
            return followUpIds;
        }

        public void setFollowUpIds(List<Long> followUpIds) {
            this.followUpIds = followUpIds;
        }
    }
}