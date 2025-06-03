package com.gymRagnarok.products.factory;

import com.gymRagnarok.products.domain.ClothingProduct;
import com.gymRagnarok.products.domain.Product;
import com.gymRagnarok.products.dto.ClothingProductDTO;
import com.gymRagnarok.products.dto.ProductDTO;
import org.springframework.stereotype.Component; 

@Component("CLOTHING")
public class ClothingProductFactory implements ProductFactory {

    @Override
public Product createProduct(ProductDTO.Request dto) {
    if (!(dto instanceof ClothingProductDTO.Request)) {
        throw new IllegalArgumentException("DTO no válido para el producto");
    }

    ClothingProductDTO.Request clothingDTO = (ClothingProductDTO.Request) dto;
    ClothingProduct product = new ClothingProduct();
    
    // Usar setters en lugar de acceso directo
    copyBaseAttributes(clothingDTO, product);
    product.setSize(clothingDTO.getSize());
    product.setColor(clothingDTO.getColor());
    product.setMaterial(clothingDTO.getMaterial());
    product.setStyle(clothingDTO.getStyle());

    return product;
}

    private void copyBaseAttributes(ProductDTO.Request dto, Product product) {
        product.setName(dto.getName());
        product.setPurchasePrice(dto.getPurchasePrice());
        product.setSalePrice(dto.getSalePrice());
        product.setDescription(dto.getDescription());
    }
}
