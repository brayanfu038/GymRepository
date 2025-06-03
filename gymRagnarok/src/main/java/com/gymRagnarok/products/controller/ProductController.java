package com.gymRagnarok.products.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gymRagnarok.products.domain.ClothingProduct;
import com.gymRagnarok.products.domain.EdibleProduct; 
import com.gymRagnarok.products.domain.Product;
import com.gymRagnarok.products.dto.ClothingProductDTO;
import com.gymRagnarok.products.dto.EdibleProductDTO;
import com.gymRagnarok.products.dto.ProductDTO;
import com.gymRagnarok.products.factory.ProductFactory;
import com.gymRagnarok.products.service.ClothingProductService;
import com.gymRagnarok.products.service.EdibleProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/inventario")
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

    @PostMapping("/register")
    public ResponseEntity<?> createProduct(@RequestBody Map<String, Object> json) {
        String type = (String) json.get("productType");

        ProductFactory factory = factories.get(type);
        if (factory == null) {
            return ResponseEntity.badRequest().body("Tipo de producto no válido: " + type);
        }

        ProductDTO.Request dto = mapToDTO(json, type);

        Product product = factory.createProduct(dto);

        return switch (type) {
            case "CLOTHING" -> ResponseEntity.ok(clothingProductService.save((ClothingProduct) product));
            case "EDIBLE" -> ResponseEntity.ok(edibleProductService.save((EdibleProduct) product));
            default -> ResponseEntity.badRequest().body("Tipo no manejado: " + type);
        };
    }

    @GetMapping("/allInventory")
    public ResponseEntity<List<ProductDTO.Response>> getAllProducts() {
        List<ProductDTO.Response> allProducts = new ArrayList<>();
        allProducts.addAll(clothingProductService.findAll());
        allProducts.addAll(edibleProductService.findAll());
        return ResponseEntity.ok(allProducts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO.Response> getById(@PathVariable Long id) {
        Optional<ProductDTO.Response> clothing = clothingProductService.findById(id)
                .map(p -> p);
        if (clothing.isPresent()) {
            return ResponseEntity.ok(clothing.get());
        }

        Optional<ProductDTO.Response> edible = edibleProductService.findById(id)
                .map(p -> p);
        return edible.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());

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

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id ,@RequestBody Map<String, Object> json) {
        String type = (String) json.get("productType");
        if (type == null) return ResponseEntity.badRequest().body("productType es requerido");

        ProductDTO.Request dto = mapToDTO(json, type);

        return switch (type) {
            case "CLOTHING" -> ResponseEntity.ok(clothingProductService.update(id, (ClothingProductDTO.Request) dto));
            case "EDIBLE" -> ResponseEntity.ok(edibleProductService.update(id, (EdibleProductDTO.Request) dto));
            default -> ResponseEntity.badRequest().body("Tipo de producto no manejado: " + type);
        };
    }

    private ProductDTO.Request mapToDTO(Map<String, Object> json, String type) {
        ObjectMapper mapper = new ObjectMapper();
        return switch (type) {
            case "CLOTHING" -> mapper.convertValue(json, ClothingProductDTO.Request.class);
            case "EDIBLE" -> mapper.convertValue(json, EdibleProductDTO.Request.class);
            default -> mapper.convertValue(json, ProductDTO.Request.class);
        };
    }

}
