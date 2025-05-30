package com.gymRagnarok.training.controller;

import com.gymRagnarok.training.dto.TrainingPlanDTO;
import com.gymRagnarok.training.service.ITrainingPlanService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-plans")
public class TrainingPlanController {

    private final ITrainingPlanService trainingPlanService;

    public TrainingPlanController(ITrainingPlanService trainingPlanService) {
        this.trainingPlanService = trainingPlanService;
    }

    @PostMapping
    public ResponseEntity<TrainingPlanDTO.Response> createTrainingPlan(
            @Valid @RequestBody TrainingPlanDTO.Request trainingPlanDTO) {
        return ResponseEntity.ok(trainingPlanService.createTrainingPlan(trainingPlanDTO));
    }

    @GetMapping
    public ResponseEntity<List<TrainingPlanDTO.Response>> getAllTrainingPlans() {
        return ResponseEntity.ok(trainingPlanService.getAllTrainingPlans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainingPlanDTO.Response> getTrainingPlanById(@PathVariable int id) {
        return ResponseEntity.ok(trainingPlanService.getTrainingPlanById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainingPlan(@PathVariable int id) {
        trainingPlanService.deleteTrainingPlan(id);
        return ResponseEntity.noContent().build();
    }
}