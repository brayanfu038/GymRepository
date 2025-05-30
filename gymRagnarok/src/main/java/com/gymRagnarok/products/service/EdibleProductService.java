package com.gymRagnarok.products.service;

import com.gymRagnarok.products.domain.EdibleProduct;
import com.gymRagnarok.products.dto.EdibleProductDTO;
import com.gymRagnarok.products.factory.EdibleProductFactory;
import com.gymRagnarok.products.repository.EdibleProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EdibleProductService {

    private final EdibleProductRepository repository;

    @Autowired
    @Qualifier("EDIBLE")
    private EdibleProductFactory factory;

    public EdibleProductService(EdibleProductRepository repository) {
        this.repository = repository;
    }

    public List<EdibleProductDTO.Response> findAll() {
        return repository.findAll().stream()
                .map( this::convertToDTO )
                .collect(Collectors.toList());
    }

    public Optional<EdibleProductDTO.Response> findById(Long id) {
        return repository.findById(id).map(this::convertToDTO);
    }

    public EdibleProductDTO.Response save(EdibleProduct product) {
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

    private EdibleProductDTO.Response convertToDTO(EdibleProduct product) {
        EdibleProductDTO.Response dto = new EdibleProductDTO.Response();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPurchasePrice(product.getPurchasePrice());
        dto.setSalePrice(product.getSalePrice());
        dto.setDescription(product.getDescription());
        dto.setBatch(product.getBatch());
        dto.setExpirationDate(product.getExpirationDate());
        dto.setProductType("EDIBLE");
        return dto;
    }
}
