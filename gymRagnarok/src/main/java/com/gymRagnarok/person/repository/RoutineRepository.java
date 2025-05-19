package com.gymRagnarok.person.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymRagnarok.person.domain.Routine;

public interface RoutineRepository extends JpaRepository<Routine, Integer>{

}
