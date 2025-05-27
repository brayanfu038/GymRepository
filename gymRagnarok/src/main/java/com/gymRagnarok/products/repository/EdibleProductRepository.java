package com.gymRagnarok.products.repository;

import com.gymRagnarok.products.domain.EdibleProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EdibleProductRepository extends JpaRepository<EdibleProduct, Long> {
}
