package com.gymRagnarok.products.controller;

import com.gymRagnarok.products.domain.ClothingProduct;
import com.gymRagnarok.products.domain.EdibleProduct;
import com.gymRagnarok.products.domain.Product;
import com.gymRagnarok.products.dto.ProductDTO;
import com.gymRagnarok.products.factory.ProductFactory;
import com.gymRagnarok.products.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final Map<String, ProductFactory> factories;
    private final ClothingProductService clothingProductService;
    private final EdibleProductService edibleProductService;

    @Autowired
    public ProductController(Map<String, ProductFactory> factories, ClothingProductService clothingProductService, EdibleProductService edibleProductService) {
        this.factories = factories;
        this.clothingProductService = clothingProductService;
        this.edibleProductService = edibleProductService;
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO.Request dto) {
        String type = dto.getProductType();

        ProductFactory factory = factories.get(type);
        if (factory == null) {
            return ResponseEntity.badRequest().body("Tipo de producto no valido: " + type);
        }

        Product product = factory.createProduct(dto);
        return switch (type) {
            case "CLOTHING" -> ResponseEntity.ok(clothingProductService.save((ClothingProduct) product));
            case "EDIBLE" -> ResponseEntity.ok(edibleProductService.save((EdibleProduct) product));
            default -> ResponseEntity.badRequest().body("Tipo de producto no manejado: " + type);
        };
    }

    @GetMapping
    public List<Product> getAllProducts() {
        List<Product> all = new ArrayList<>();
        all.addAll(clothingProductService.findAll());
        all.addAll(edibleProductService.findAll());
        return all;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return clothingProductService.findById(id)
                .map(product -> (Product) product)
                .map(ResponseEntity::ok)
                .or(() -> edibleProductService.findById(id)
                        .map(product -> (Product) product)
                        .map(ResponseEntity::ok))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        if (clothingProductService.findById(id).isPresent()) {
            clothingProductService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        if (edibleProductService.findById(id).isPresent()) {
            edibleProductService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
