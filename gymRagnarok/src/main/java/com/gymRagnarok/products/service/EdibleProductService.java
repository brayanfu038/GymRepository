package com.gymRagnarok.products.service;

import com.gymRagnarok.products.domain.EdibleProduct;
import com.gymRagnarok.products.repository.EdibleProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EdibleProductService {

    private final EdibleProductRepository repository;

    public EdibleProductService(EdibleProductRepository repository) {
        this.repository = repository;
    }

    public List<EdibleProduct> findAll() {
        return repository.findAll();
    }

    public Optional<EdibleProduct> findById(Long id) {
        return repository.findById(id);
    }

    public EdibleProduct save(EdibleProduct product) {
        return repository.save(product);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
