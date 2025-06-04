package com.gymRagnarok.finanzas.controller;
import com.gymRagnarok.finanzas.domain.Invoice;
import com.gymRagnarok.finanzas.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return invoiceService.create(invoice);
    }

    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable String id) {
        return invoiceService.getById(id);
    }

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAll();
    }


    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable String id) {
        invoiceService.delete(id);
    }
}
