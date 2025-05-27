package com.gymRagnarok.person.repository;

import com.gymRagnarok.person.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Métodos personalizados si son necesarios
}