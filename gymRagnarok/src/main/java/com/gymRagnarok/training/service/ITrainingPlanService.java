package com.gymRagnarok.training.service;

import com.gymRagnarok.training.dto.TrainingPlanDTO;
import java.util.List;

public interface ITrainingPlanService {
    TrainingPlanDTO.Response createTrainingPlan(TrainingPlanDTO.Request trainingPlanDTO);
    List<TrainingPlanDTO.Response> getAllTrainingPlans();
    TrainingPlanDTO.Response getTrainingPlanById(int id);
    void deleteTrainingPlan(int id);
}