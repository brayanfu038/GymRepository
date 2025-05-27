package com.gymRagnarok.products.factory;

import com.gymRagnarok.products.domain.EdibleProduct;
import com.gymRagnarok.products.domain.Product;
import com.gymRagnarok.products.dto.EdibleProductDTO;
import com.gymRagnarok.products.dto.ProductDTO;
import org.springframework.stereotype.Component;

@Component("EDIBLE")
public class EdibleProductFactory implements ProductFactory {

    @Override
    public Product createProduct(ProductDTO.Request dto) {
        if (!(dto instanceof EdibleProductDTO.Request)) {
            throw new IllegalArgumentException("DTO no valido para el producto comestible");
        }

        EdibleProductDTO.Request edibleDTO = (EdibleProductDTO.Request) dto;
        EdibleProduct product = new EdibleProduct();
        copyBaseAttributes(edibleDTO, product);
        product.setBatch(edibleDTO.getBatch());
        product.setExpirationDate(edibleDTO.getExpirationDate());

        return product;
    }

    private void copyBaseAttributes(ProductDTO.Request dto, Product product) {
        product.setName(dto.getName());
        product.setPurchasePrice(dto.getPurchasePrice());
        product.setSalePrice(dto.getSalePrice());
        product.setDescription(dto.getDescription());
    }
}
