package com.gymRagnarok.domain;
	
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customers")
public class Customer extends Person {

    private int weight;
    private int stature; // estatura en cm



    @ManyToOne
    @JoinColumn(name = "anamnesis_id")
    private Anamnesis anamnesis;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<TrainingSession> trainingSessionList = new ArrayList<>();

    // Método personalizado para agregar sesiones
    public void addTrainingSession(TrainingSession session) {
        session.setPerson(this); // asegurar bidireccionalidad
        this.trainingSessionList.add(session);
    }

    // Getters y setters

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getStature() {
        return stature;
    }

    public void setStature(int stature) {
        this.stature = stature;
    }


    public Anamnesis getAnamnesis() {
        return anamnesis;
    }

    public void setAnamnesis(Anamnesis anamnesis) {
        this.anamnesis = anamnesis;
    }

    public List<TrainingSession> getTrainingSessionList() {
        return trainingSessionList;
    }

    public void setTrainingSessionList(List<TrainingSession> trainingSessionList) {
        this.trainingSessionList = trainingSessionList;
    }
}
