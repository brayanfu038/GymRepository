package com.gymRagnarok.products.service;

import com.gymRagnarok.products.domain.ClothingProduct;
import com.gymRagnarok.products.repository.ClothingProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClothingProductService {

    private final ClothingProductRepository repository;

    public ClothingProductService(ClothingProductRepository repository) {
        this.repository = repository;
    }

    public List<ClothingProduct> findAll() {
        return repository.findAll();
    }

    public Optional<ClothingProduct> findById(Long id) {
        return repository.findById(id);
    }

    public ClothingProduct save(ClothingProduct product) {
        return repository.save(product);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
