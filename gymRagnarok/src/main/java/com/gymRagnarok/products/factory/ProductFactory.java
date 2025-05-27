package com.gymRagnarok.products.factory;

import com.gymRagnarok.products.domain.Product;
import com.gymRagnarok.products.dto.ProductDTO;

public interface ProductFactory {

    public Product createProduct(ProductDTO.Request dto);

}
