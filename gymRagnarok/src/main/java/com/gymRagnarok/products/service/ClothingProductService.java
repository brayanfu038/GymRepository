package com.gymRagnarok.products.service;

import com.gymRagnarok.products.domain.ClothingProduct;
import com.gymRagnarok.products.dto.ClothingProductDTO;
import com.gymRagnarok.products.factory.ClothingProductFactory;
import com.gymRagnarok.products.repository.ClothingProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClothingProductService { 

    private final ClothingProductRepository repository;

    @Autowired
    @Qualifier("CLOTHING")
    private ClothingProductFactory factory;

    public ClothingProductService(ClothingProductRepository repository) {
        this.repository = repository;
    }

    public List<ClothingProductDTO.Response> findAll() {
        return repository.findAll().stream()
                .map( this::convertToDTO )
                .collect(Collectors.toList());
    }

    public Optional<ClothingProductDTO.Response> findById(Long id) {
        return repository.findById(id).map(this::convertToDTO);
    }

    public ClothingProductDTO.Response save(ClothingProduct product) {
        return convertToDTO(repository.save(product));
    }

    public boolean deleteById(Long id) {
        System.out.println("asdfsadfgsdagdsaf" + id);
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    private ClothingProductDTO.Response convertToDTO(ClothingProduct product) {
    ClothingProductDTO.Response dto = new ClothingProductDTO.Response();
    
    // Usar setters en lugar de acceso directo
    dto.setId(product.getId());
    dto.setName(product.getName());
    dto.setPurchasePrice(product.getPurchasePrice());
    dto.setSalePrice(product.getSalePrice());
    dto.setDescription(product.getDescription());
    
    // Usar los getters recién implementados
    dto.setSize(product.getSize());
    dto.setColor(product.getColor());
    dto.setMaterial(product.getMaterial());
    dto.setStyle(product.getStyle());
    
    dto.setProductType("CLOTHING");
    return dto;
}
}
