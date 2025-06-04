package com.gymRagnarok.finanzas.controller;
import com.gymRagnarok.finanzas.domain.Transaction;
import com.gymRagnarok.finanzas.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.create(transaction);
    }

    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return transactionService.getById(id);
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAll();
    }

    @PutMapping
    public Transaction updateTransaction(@RequestBody Transaction transaction) {
        return transactionService.update(transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.delete(id);
    }
}
