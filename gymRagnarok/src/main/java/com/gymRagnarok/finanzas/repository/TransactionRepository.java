package com.gymRagnarok.finanzas.repository;

import com.gymRagnarok.finanzas.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Buscar por tipo de transacción (ENTRADA o SALIDA)
}
