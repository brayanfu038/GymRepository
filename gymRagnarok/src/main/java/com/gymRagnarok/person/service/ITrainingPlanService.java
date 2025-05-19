package com.gymRagnarok.person.service;

import java.util.List;

import com.gymRagnarok.person.domain.TrainingPlan;

public interface ITrainingPlanService {
    TrainingPlan createTrainingPlan(TrainingPlan trainingPlan);
    List<TrainingPlan> getAllTrainingPlans();
    TrainingPlan getTrainingPlanById(int id);
    void deleteTrainingPlan(int id);
}
