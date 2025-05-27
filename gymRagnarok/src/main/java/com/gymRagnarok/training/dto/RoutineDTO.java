package com.gymRagnarok.training.dto;

import com.gymRagnarok.training.domain.Exercise;
import jakarta.validation.constraints.*;

import java.util.List;

public class RoutineDTO {

    public static class Request {
        @NotBlank(message = "El nombre de la rutina es obligatorio")
        @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
        private String routineName;

        @NotBlank(message = "El área de enfoque es obligatoria")
        @Size(max = 50, message = "El área de enfoque no puede exceder 50 caracteres")
        private String focusArea;

        @Min(value = 1, message = "La duración mínima debe ser al menos 1 minuto")
        @Max(value = 300, message = "La duración no puede exceder 300 minutos")
        private int durationMin;

        @Size(max = 1000, message = "Las notas no pueden exceder 1000 caracteres")
        private String notes;

        @Pattern(regexp = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Formato de hora inválido (HH:MM)")
        private String startTime;

        @Pattern(regexp = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Formato de hora inválido (HH:MM)")
        private String endTime;

        @NotEmpty(message = "Debe incluir al menos un ejercicio")
        private List<Integer> exerciseIds;

        // Getters y Setters

        public String getRoutineName() {
            return routineName;
        }

        public void setRoutineName(String routineName) {
            this.routineName = routineName;
        }

        public String getFocusArea() {
            return focusArea;
        }

        public void setFocusArea(String focusArea) {
            this.focusArea = focusArea;
        }

        public int getDurationMin() {
            return durationMin;
        }

        public void setDurationMin(int durationMin) {
            this.durationMin = durationMin;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public String getStartTime() {
            return startTime;
        }

        public void setStartTime(String startTime) {
            this.startTime = startTime;
        }

        public String getEndTime() {
            return endTime;
        }

        public void setEndTime(String endTime) {
            this.endTime = endTime;
        }

        public List<Integer> getExerciseIds() {
            return exerciseIds;
        }

        public void setExerciseIds(List<Integer> exerciseIds) {
            this.exerciseIds = exerciseIds;
        }
    }

    public static class Response {
        private int id;
        private String routineName;
        private String focusArea;
        private int durationMin;
        private String notes;
        private String startTime;
        private String endTime;
        private List<ExerciseDTO.Response> exercises;

        // Getters y Setters

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getRoutineName() {
            return routineName;
        }

        public void setRoutineName(String routineName) {
            this.routineName = routineName;
        }

        public String getFocusArea() {
            return focusArea;
        }

        public void setFocusArea(String focusArea) {
            this.focusArea = focusArea;
        }

        public int getDurationMin() {
            return durationMin;
        }

        public void setDurationMin(int durationMin) {
            this.durationMin = durationMin;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public String getStartTime() {
            return startTime;
        }

        public void setStartTime(String startTime) {
            this.startTime = startTime;
        }

        public String getEndTime() {
            return endTime;
        }

        public void setEndTime(String endTime) {
            this.endTime = endTime;
        }

        public List<ExerciseDTO.Response> getExercises() {
            return exercises;
        }

        public void setExercises(List<ExerciseDTO.Response> exercises) {
            this.exercises = exercises;
        }
    }
}