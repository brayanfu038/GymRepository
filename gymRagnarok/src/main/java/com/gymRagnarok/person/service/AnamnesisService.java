package com.gymRagnarok.person.service;

import com.gymRagnarok.exception.GlobalExceptionHandler;
import com.gymRagnarok.person.domain.Anamnesis;
import com.gymRagnarok.person.domain.Customer;
import com.gymRagnarok.person.dto.AnamnesisDTO;
import com.gymRagnarok.person.repository.AnamnesisRepository;
import com.gymRagnarok.person.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AnamnesisService {

    private final AnamnesisRepository anamnesisRepository;
    private final CustomerRepository customerRepository;

    public AnamnesisService(AnamnesisRepository anamnesisRepository,
                            CustomerRepository customerRepository) {
        this.anamnesisRepository = anamnesisRepository;
        this.customerRepository = customerRepository;
    }

    public AnamnesisDTO.Response createAnamnesis(AnamnesisDTO.Request dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new GlobalExceptionHandler.CustomerNotFoundException("Cliente no encontrado"));

        Anamnesis previous = null;
        if (dto.getPreviousAnamnesisId() != null) {
            previous = anamnesisRepository.findById(dto.getPreviousAnamnesisId())
                    .orElseThrow(() -> new GlobalExceptionHandler.AnamnesisNotFoundException("Anamnesis anterior no encontrada"));
        }

        Anamnesis anamnesis = new Anamnesis();
        anamnesis.setPathologies(dto.getPathologies());
        anamnesis.setObservations(dto.getObservations());
        anamnesis.setPreviousAnamnesis(previous);
        anamnesis.setCustomer(customer);

        return convertToDTO(anamnesisRepository.save(anamnesis));
    }

    public AnamnesisDTO.Response getAnamnesisById(Long id) {
        return convertToDTO(anamnesisRepository.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.AnamnesisNotFoundException("Anamnesis no encontrada")));
    }

    public List<AnamnesisDTO.Response> getByCustomerId(Long customerId) {
        return anamnesisRepository.findByCustomerId(customerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AnamnesisDTO.Response updateAnamnesis(Long id, AnamnesisDTO.Request dto) {
        Anamnesis existing = anamnesisRepository.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.AnamnesisNotFoundException("Anamnesis no encontrada"));

        if (dto.getPathologies() != null) existing.setPathologies(dto.getPathologies());
        if (dto.getObservations() != null) existing.setObservations(dto.getObservations());

        return convertToDTO(anamnesisRepository.save(existing));
    }

    public void deleteAnamnesis(Long id) {
        Anamnesis anamnesis = anamnesisRepository.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.AnamnesisNotFoundException("Anamnesis no encontrada"));

        // Eliminar relaciones recursivas
        anamnesis.getFollowUps().forEach(f -> f.setPreviousAnamnesis(null));
        anamnesisRepository.delete(anamnesis);
    }

    private AnamnesisDTO.Response convertToDTO(Anamnesis anamnesis) {
        AnamnesisDTO.Response dto = new AnamnesisDTO.Response();
        dto.setId(anamnesis.getId());
        dto.setDate(anamnesis.getDate());
        dto.setPathologies(anamnesis.getPathologies());
        dto.setObservations(anamnesis.getObservations());
        dto.setCustomerId(anamnesis.getCustomer().getId());

        if (anamnesis.getPreviousAnamnesis() != null) {
            dto.setPreviousAnamnesisId(anamnesis.getPreviousAnamnesis().getId());
        }

        dto.setFollowUpIds(anamnesis.getFollowUps().stream()
                .map(Anamnesis::getId)
                .collect(Collectors.toList()));

        return dto;
    }
}