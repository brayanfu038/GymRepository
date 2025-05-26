package com.gymRagnarok.training.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymRagnarok.training.domain.TrainingPlan;

public interface TrainingPlanRepository extends JpaRepository<TrainingPlan, Integer>{

}
