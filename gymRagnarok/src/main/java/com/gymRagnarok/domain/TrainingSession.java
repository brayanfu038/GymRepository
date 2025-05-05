package com.gymRagnarok.domain;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "training_sessions")
public class TrainingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String description;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer person;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public void setPerson(Customer person) {
        this.person = person;
    }
}
