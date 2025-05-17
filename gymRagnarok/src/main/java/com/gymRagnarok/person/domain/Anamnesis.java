package com.gymRagnarok.domain;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "anamnesis")
public class Anamnesis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String pathologies;
    private String observations;

    // Relación con Person


    // 🔁 Relación recursiva: Anamnesis anterior
    @ManyToOne
    @JoinColumn(name = "previous_anamnesis_id")
    private Anamnesis previousAnamnesis;

    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // 🔁 Lista de anamnesis que se derivan de esta
    @OneToMany(mappedBy = "previousAnamnesis", cascade = CascadeType.ALL)
    private List<Anamnesis> followUps;

    // Getters y Setters...

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPathologies() {
        return pathologies;
    }

    public void setPathologies(String pathologies) {
        this.pathologies = pathologies;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public Anamnesis getPreviousAnamnesis() {
        return previousAnamnesis;
    }

    public void setPreviousAnamnesis(Anamnesis previousAnamnesis) {
        this.previousAnamnesis = previousAnamnesis;
    }

    public List<Anamnesis> getFollowUps() {
        return followUps;
    }

    public void setFollowUps(List<Anamnesis> followUps) {
        this.followUps = followUps;
    }
}
