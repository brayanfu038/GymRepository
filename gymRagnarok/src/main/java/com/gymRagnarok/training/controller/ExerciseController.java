package com.gymRagnarok.training.controller;

import com.gymRagnarok.training.domain.Exercise;
import com.gymRagnarok.training.service.ExerciseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable int id) {
        return exerciseService.getExerciseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Exercise createExercise(@RequestBody Exercise exercise) {
        return exerciseService.createExercise(exercise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable int id, @RequestBody Exercise exercise) {
        try {
            return ResponseEntity.ok(exerciseService.updateExercise(id, exercise));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable int id) {
        try {
            exerciseService.deleteExercise(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Exercise> searchByName(@RequestParam String name) {
        return exerciseService.searchByName(name);
    }

    @GetMapping("/sets")
    public List<Exercise> getBySets(@RequestParam int sets) {
        return exerciseService.getBySets(sets);
    }

    @GetMapping("/repetitions")
    public List<Exercise> getByRepetitions(@RequestParam int repetitions) {
        return exerciseService.getByRepetitions(repetitions);
    }
}
