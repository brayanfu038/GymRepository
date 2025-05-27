package com.gymRagnarok.training.controller;

import com.gymRagnarok.training.dto.ExerciseDTO;
import com.gymRagnarok.training.service.ExerciseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<ExerciseDTO.Response> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseDTO.Response> getExerciseById(@PathVariable int id) {
        return exerciseService.getExerciseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ExerciseDTO.Response> createExercise(
            @Valid @RequestBody ExerciseDTO.Request exerciseDTO) {
        return ResponseEntity.status(201)
                .body(exerciseService.createExercise(exerciseDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExerciseDTO.Response> updateExercise(
            @PathVariable int id,
            @Valid @RequestBody ExerciseDTO.Request exerciseDTO) {
        return ResponseEntity.ok(exerciseService.updateExercise(id, exerciseDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable int id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<ExerciseDTO.Response> searchByName(@RequestParam String name) {
        return exerciseService.searchByName(name);
    }

    @GetMapping("/sets")
    public List<ExerciseDTO.Response> getBySets(@RequestParam int sets) {
        return exerciseService.getBySets(sets);
    }

    @GetMapping("/repetitions")
    public List<ExerciseDTO.Response> getByRepetitions(@RequestParam int repetitions) {
        return exerciseService.getByRepetitions(repetitions);
    }
}