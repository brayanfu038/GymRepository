package com.gymRagnarok.person.repository;

import com.gymRagnarok.person.domain.Anamnesis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnamnesisRepository extends JpaRepository<Anamnesis, Long> {
    List<Anamnesis> findByCustomerId(Long customerId);
}