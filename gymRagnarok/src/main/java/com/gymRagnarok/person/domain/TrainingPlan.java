package com.gymRagnarok.person.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "training_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingPlan {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String objective;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "training_plan_id") // FK en tabla Routine
    private List<Routine> routines;
    

    @OneToOne(mappedBy = "trainingPlan")
    private Customer customer;
    
    
    
    public int getId() {
		return id;
	}


	public void setId(int id) {
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


	public TrainingPlan(int id2, String objective2, String notes2, List<Routine> routines2) {
		// TODO Auto-generated constructor stub
	}

    
    public static class TrainingPlanBuilder {
        private int id;
        private String objective;
        private String notes;
        private List<Routine> routines = new ArrayList<>();

        public TrainingPlanBuilder setId(int id) {
            this.id = id;
            return this;
        }

        public TrainingPlanBuilder setObjective(String objective) {
            this.objective = objective;
            return this;
        }

        public TrainingPlanBuilder setNotes(String notes) {
            this.notes = notes;
            return this;
        }

        public TrainingPlanBuilder setRoutines(List<Routine> routines) {
            this.routines = routines;
            return this;
        }

        public TrainingPlanBuilder addRoutine(Routine routine) {
            this.routines.add(routine);
            return this;
        }

        public TrainingPlan build() {
            return new TrainingPlan(id, objective, notes, routines);
        }
    }
}
