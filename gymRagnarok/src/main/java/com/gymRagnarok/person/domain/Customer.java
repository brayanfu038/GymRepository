package com.gymRagnarok.person.domain;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import com.gymRagnarok.training.domain.TrainingPlan;

@Entity
@Table(name = "customers")
@PrimaryKeyJoinColumn(name = "identification_number")
public class Customer extends Person {
    @Column(name = "weight")
    private Integer weight; // Cambiado a Integer

    @Column(name = "stature")
    private Integer stature; // Cambiado a Integer 

    @ManyToOne
    @JoinColumn(name = "anamnesis_id")
    private Anamnesis anamnesis;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "training_plan_id", referencedColumnName = "id")
    private TrainingPlan trainingPlan;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TrainingSession> trainingSessions = new ArrayList<>();

    public void addTrainingSession(TrainingSession session) {
        trainingSessions.add(session);
        session.setCustomer(this);
    }

    public void removeTrainingSession(TrainingSession session) {
        trainingSessions.remove(session);
        session.setCustomer(null);
    }

    // Getters y Setters (actualizados)
    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getStature() {
        return stature;
    }

    public void setStature(Integer stature) {
        this.stature = stature;
    }

    public Anamnesis getAnamnesis() {
        return anamnesis;
    }

    public void setAnamnesis(Anamnesis anamnesis) {
        this.anamnesis = anamnesis;
    }

    public List<TrainingSession> getTrainingSessions() {
        return trainingSessions;
    }

    public void setTrainingSessions(List<TrainingSession> trainingSessions) {
        this.trainingSessions = trainingSessions;
    }
    

    public void setTrainingPlan(TrainingPlan trainingPlan) {
    this.trainingPlan = trainingPlan;
        }
public TrainingPlan getTrainingPlan() {
    return trainingPlan;
}


} 