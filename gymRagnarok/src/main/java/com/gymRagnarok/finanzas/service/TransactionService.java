package com.gymRagnarok.finanzas.service;
import com.gymRagnarok.finanzas.domain.Transaction;
import com.gymRagnarok.finanzas.domain.TypeTransaction;
import com.gymRagnarok.finanzas.domain.Pay;
import com.gymRagnarok.finanzas.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction create(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Transaction getById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transacción no encontrada con ID: " + id));
    }

    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }

    public Transaction update(Transaction transaction) {
        if (!transactionRepository.existsById(transaction.getIdTransaction())) {
            throw new RuntimeException("No se puede actualizar. Transacción no existe.");
        }
        return transactionRepository.save(transaction);
    }

    public void delete(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Transacción no encontrada.");
        }
        transactionRepository.deleteById(id);
    }

}
