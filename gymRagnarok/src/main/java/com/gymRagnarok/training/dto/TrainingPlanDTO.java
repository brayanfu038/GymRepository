package com.gymRagnarok.training.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class TrainingPlanDTO {

    public static class Request {
        @NotBlank(message = "El objetivo no puede estar vacío")
        @Size(max = 200, message = "El objetivo no puede exceder 200 caracteres")
        private String objective;

        @Size(max = 1000, message = "Las notas no pueden exceder 1000 caracteres")
        private String notes;

        @NotEmpty(message = "Debe incluir al menos una rutina")
        private List<Integer> routineIds;

        @NotNull(message = "El ID del cliente es obligatorio")
        private Long customerId;

        // Getters y Setters
        public String getObjective() {
            return objective;
        }

        public void setObjective(String objective) {
            this.objective = objective;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public List<Integer> getRoutineIds() {
            return routineIds;
        }

        public void setRoutineIds(List<Integer> routineIds) {
            this.routineIds = routineIds;
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
        private String objective;
        private String notes;
        private List<RoutineDTO.Response> routines;
        private Long customerId;

        // Getters y Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getObjective() {
            return objective;
        }

        public void setObjective(String objective) {
            this.objective = objective;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public List<RoutineDTO.Response> getRoutines() {
            return routines;
        }

        public void setRoutines(List<RoutineDTO.Response> routines) {
            this.routines = routines;
        }

        public Long getCustomerId() {
            return customerId;
        }

        public void setCustomerId(Long customerId) {
            this.customerId = customerId;
        }
    }
}