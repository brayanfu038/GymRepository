package com.gymRagnarok.finanzas.service;
import com.gymRagnarok.finanzas.domain.Invoice;
import com.gymRagnarok.finanzas.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public Invoice create(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Invoice getById(String id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada con ID: " + id));
    }

    public List<Invoice> getAll() {
        return invoiceRepository.findAll();
    }

    public void delete(String id) {
        if (!invoiceRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Factura no encontrada.");
        }
        invoiceRepository.deleteById(id);
    }
}
