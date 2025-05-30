package com.gymRagnarok.training.domain;

import com.gymRagnarok.person.domain.Customer;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "training_plans")
public class TrainingPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String objective;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "training_plan_id")
    private List<Routine> routines = new ArrayList<>();

    @OneToOne(mappedBy = "trainingPlan")
    private Customer customer;

    public TrainingPlan() {
    }

    public TrainingPlan(String objective, String notes, List<Routine> routines) {
        this.objective = objective;
        this.notes = notes;
        this.routines = routines;
    }

    public static TrainingPlanBuilder builder() {
        return new TrainingPlanBuilder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<Routine> getRoutines() {
        return routines;
    }

    public void setRoutines(List<Routine> routines) {
        this.routines = routines;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public static class TrainingPlanBuilder {
        private Long id;
        private String objective;
        private String notes;
        private List<Routine> routines = new ArrayList<>();

        public TrainingPlanBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public TrainingPlanBuilder objective(String objective) {
            this.objective = objective;
            return this;
        }

        public TrainingPlanBuilder notes(String notes) {
            this.notes = notes;
            return this;
        }

        public TrainingPlanBuilder routines(List<Routine> routines) {
            this.routines = routines;
            return this;
        }

        public TrainingPlanBuilder addRoutine(Routine routine) {
            this.routines.add(routine);
            return this;
        }

        public TrainingPlan build() {
            TrainingPlan plan = new TrainingPlan();
            plan.setId(this.id);
            plan.setObjective(this.objective);
            plan.setNotes(this.notes);
            plan.setRoutines(this.routines);
            return plan;
        }
    }
}
