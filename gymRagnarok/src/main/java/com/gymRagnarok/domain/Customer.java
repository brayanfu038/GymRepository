package com.gymRagnarok.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("CUSTOMER")
public class Customer extends Person {

    private int weight;
    private int stature; // estatura en cm

    @ManyToOne
    @JoinColumn(name = "anamnesis_id")
    private Anamnesis anamnesis;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TrainingSession> trainingSessions = new ArrayList<>();

    // Métodos de utilidad para la relación bidireccional
    public void addTrainingSession(TrainingSession session) {
        trainingSessions.add(session);
        session.setPerson(this);
    }

    public void removeTrainingSession(TrainingSession session) {
        trainingSessions.remove(session);
        session.setPerson(null);
    }

    // Getters y Setters
    public int getWeight() { return weight; }
    public void setWeight(int weight) { this.weight = weight; }
    public int getStature() { return stature; }
    public void setStature(int stature) { this.stature = stature; }
    public Anamnesis getAnamnesis() { return anamnesis; }
    public void setAnamnesis(Anamnesis anamnesis) { this.anamnesis = anamnesis; }
    public List<TrainingSession> getTrainingSessions() { return trainingSessions; }
    public void setTrainingSessions(List<TrainingSession> trainingSessions) { this.trainingSessions = trainingSessions; }
}