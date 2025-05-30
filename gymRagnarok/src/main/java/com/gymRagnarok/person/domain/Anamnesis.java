package com.gymRagnarok.person.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "anamnesis")
public class Anamnesis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date = LocalDate.now();  // Valor por defecto

    @Column(length = 1000)
    private String pathologies;

    @Column(length = 2000)
    private String observations;

    // 🔁 Relación recursiva (historial de anamnesis)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "previous_anamnesis_id")
    private Anamnesis previousAnamnesis;

    // Relación bidireccional con Customer (1:1)
    @OneToOne(mappedBy = "anamnesis", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Customer customer;

    // 🔁 Lista de seguimientos derivados de esta anamnesis
    @OneToMany(mappedBy = "previousAnamnesis", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Anamnesis> followUps;

    // Getters y Setters (mejorados)
    public void addFollowUp(Anamnesis followUp) {
        followUps.add(followUp);
        followUp.setPreviousAnamnesis(this);
    }

    public void removeFollowUp(Anamnesis followUp) {
        followUps.remove(followUp);
        followUp.setPreviousAnamnesis(null);
    }

    // Resto de getters y setters...

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<Anamnesis> getFollowUps() {
        return followUps;
    }

    public void setFollowUps(List<Anamnesis> followUps) {
        this.followUps = followUps;
    }

}