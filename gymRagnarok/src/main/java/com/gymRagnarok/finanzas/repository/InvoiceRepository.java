package com.gymRagnarok.finanzas.repository;

import com.gymRagnarok.finanzas.domain.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, String> {
    // Podrías buscar por transaction si necesitas
}
