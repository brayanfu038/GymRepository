package com.gymRagnarok.training.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gymRagnarok.training.domain.TrainingPlan;
import com.gymRagnarok.training.repository.TrainingPlanRepository;

@Service
public class TrainingPlanServiceImpl implements ITrainingPlanService {

    private final TrainingPlanRepository trainingPlanRepository;

    public TrainingPlanServiceImpl(TrainingPlanRepository trainingPlanRepository) {
        this.trainingPlanRepository = trainingPlanRepository;
    }

    @Override
    public TrainingPlan createTrainingPlan(TrainingPlan trainingPlan) {
        return trainingPlanRepository.save(trainingPlan);
    }

    @Override
    public List<TrainingPlan> getAllTrainingPlans() {
        return trainingPlanRepository.findAll();
    }

    @Override
    public TrainingPlan getTrainingPlanById(int id) {
        return trainingPlanRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteTrainingPlan(int id) {
        trainingPlanRepository.deleteById(id);
    }
}
