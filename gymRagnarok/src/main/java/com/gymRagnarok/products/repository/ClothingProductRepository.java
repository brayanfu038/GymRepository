package com.gymRagnarok.products.repository;

import com.gymRagnarok.products.domain.ClothingProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingProductRepository extends JpaRepository<ClothingProduct, Long> {

}
 