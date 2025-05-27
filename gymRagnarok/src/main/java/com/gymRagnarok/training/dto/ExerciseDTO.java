package com.gymRagnarok.training.dto;

import jakarta.validation.constraints.*;

public class ExerciseDTO {

    public static class Request {
        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
        private String name;

        @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
        private String description;

        @Min(value = 1, message = "Las series deben ser al menos 1")
        @Max(value = 20, message = "Las series no pueden exceder 20")
        private int sets;

        @Min(value = 1, message = "Las repeticiones deben ser al menos 1")
        @Max(value = 100, message = "Las repeticiones no pueden exceder 100")
        private int repetitions;

        // Getters y Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public int getSets() { return sets; }
        public void setSets(int sets) { this.sets = sets; }
        public int getRepetitions() { return repetitions; }
        public void setRepetitions(int repetitions) { this.repetitions = repetitions; }
    }

    public static class Response {
        private int id;
        private String name;
        private String description;
        private int sets;
        private int repetitions;

        // Getters y Setters
        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public int getSets() { return sets; }
        public void setSets(int sets) { this.sets = sets; }
        public int getRepetitions() { return repetitions; }
        public void setRepetitions(int repetitions) { this.repetitions = repetitions; }
    }
}