package com.gymRagnarok.person.controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gymRagnarok.person.domain.TrainingPlan;
import com.gymRagnarok.person.service.ITrainingPlanService;

import java.util.List;

@RestController
@RequestMapping("/api/training-plans")
public class TrainingPlanController {

    private final ITrainingPlanService trainingPlanService;

    public TrainingPlanController(ITrainingPlanService trainingPlanService) {
        this.trainingPlanService = trainingPlanService;
    }

    // 🔹 Crear un nuevo plan
    @PostMapping
    public ResponseEntity<TrainingPlan> createTrainingPlan(@RequestBody TrainingPlan trainingPlan) {
    	System.out.println(trainingPlan.getObjective());
        TrainingPlan savedPlan = trainingPlanService.createTrainingPlan(trainingPlan);
        return ResponseEntity.ok(savedPlan);
    }

    // 🔹 Obtener todos los planes
    @GetMapping
    public ResponseEntity<List<TrainingPlan>> getAllTrainingPlans() {
        List<TrainingPlan> plans = trainingPlanService.getAllTrainingPlans();
        return ResponseEntity.ok(plans);
    }

    // 🔹 Obtener plan por ID
    @GetMapping("/{id}")
    public ResponseEntity<TrainingPlan> getTrainingPlanById(@PathVariable int id) {
        TrainingPlan plan = trainingPlanService.getTrainingPlanById(id);
        if (plan != null) {
            return ResponseEntity.ok(plan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 🔹 Eliminar plan
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainingPlan(@PathVariable int id) {
        trainingPlanService.deleteTrainingPlan(id);
        return ResponseEntity.noContent().build();
    }
}
