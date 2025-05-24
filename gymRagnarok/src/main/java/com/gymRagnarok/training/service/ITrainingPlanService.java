package com.gymRagnarok.training.service;

import java.util.List;

import com.gymRagnarok.training.domain.TrainingPlan;

public interface ITrainingPlanService {
    TrainingPlan createTrainingPlan(TrainingPlan trainingPlan);
    List<TrainingPlan> getAllTrainingPlans();
    TrainingPlan getTrainingPlanById(int id);
    void deleteTrainingPlan(int id);
}
