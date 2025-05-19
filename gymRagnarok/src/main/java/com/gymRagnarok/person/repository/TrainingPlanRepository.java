package com.gymRagnarok.person.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymRagnarok.person.domain.TrainingPlan;

public interface TrainingPlanRepository extends JpaRepository<TrainingPlan, Integer>{

}
