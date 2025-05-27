package com.gymRagnarok.person.service;

import com.gymRagnarok.exception.GlobalExceptionHandler;
import com.gymRagnarok.person.domain.Anamnesis;
import com.gymRagnarok.person.domain.Customer;

import com.gymRagnarok.person.dto.CustomerDTO;
import com.gymRagnarok.person.repository.AnamnesisRepository;
import com.gymRagnarok.person.repository.CustomerRepository;
import com.gymRagnarok.training.domain.TrainingPlan;
import com.gymRagnarok.training.repository.TrainingPlanRepository;
import com.gymRagnarok.person.domain.TrainingSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AnamnesisRepository anamnesisRepository;
    private final TrainingPlanRepository trainingPlanRepository;

    public CustomerService(
            CustomerRepository customerRepository,
            AnamnesisRepository anamnesisRepository,
            TrainingPlanRepository trainingPlanRepository) {
        this.customerRepository = customerRepository;
        this.anamnesisRepository = anamnesisRepository;
        this.trainingPlanRepository = trainingPlanRepository;
    }

    public CustomerDTO.Response createCustomer(CustomerDTO.Request customerDTO) {
        validateCustomerRequest(customerDTO);

        Anamnesis anamnesis = anamnesisRepository.findById(customerDTO.getAnamnesisId())
                .orElseThrow(() -> new GlobalExceptionHandler.AnamnesisNotFoundException("Anamnesis no encontrada"));

       TrainingPlan trainingPlan = trainingPlanRepository.findById(customerDTO.getTrainingPlanId())
            .orElseThrow(() -> new GlobalExceptionHandler.TrainingPlanNotFoundException("Plan de entrenamiento no encontrado"));


        Customer customer = new Customer();
        // Campos de Person
        customer.setIdentificationNumber(customerDTO.getIdentificationNumber());
        customer.setNames(customerDTO.getNames());
        customer.setLastNames(customerDTO.getLastNames());
        customer.setTypeId(customerDTO.getTypeId());
        customer.setDateBirth(customerDTO.getDateBirth());
        customer.setNumberPhone(customerDTO.getNumberPhone());
        // Campos de Customer
        customer.setWeight(customerDTO.getWeight());
        customer.setStature(customerDTO.getStature());
        customer.setAnamnesis(anamnesis);
        customer.setTrainingPlan(trainingPlan);

        Customer savedCustomer = customerRepository.save(customer);
        return convertToResponseDTO(savedCustomer);
    }

    public CustomerDTO.Response getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.CustomerNotFoundException("Cliente no encontrado"));
        return convertToResponseDTO(customer);
    }

    public List<CustomerDTO.Response> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public CustomerDTO.Response updateCustomer(Long id, CustomerDTO.Request customerDTO) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.CustomerNotFoundException("Cliente no encontrado"));

        // Actualizar campos de Person
        if (customerDTO.getNames() != null) existingCustomer.setNames(customerDTO.getNames());
        if (customerDTO.getLastNames() != null) existingCustomer.setLastNames(customerDTO.getLastNames());
        if (customerDTO.getNumberPhone() != null) existingCustomer.setNumberPhone(customerDTO.getNumberPhone());
        if (customerDTO.getDateBirth() != null) existingCustomer.setDateBirth(customerDTO.getDateBirth());

        // Actualizar campos de Customer
        if (customerDTO.getWeight() != null) existingCustomer.setWeight(customerDTO.getWeight());
        if (customerDTO.getStature() != null) existingCustomer.setStature(customerDTO.getStature());
        if (customerDTO.getAnamnesisId() != null) {
            Anamnesis anamnesis = anamnesisRepository.findById(customerDTO.getAnamnesisId())
                    .orElseThrow(() -> new GlobalExceptionHandler.AnamnesisNotFoundException("Anamnesis no encontrada"));
            existingCustomer.setAnamnesis(anamnesis);
        }
        if (customerDTO.getTrainingPlanId() != null) {
            TrainingPlan trainingPlan = trainingPlanRepository.findById(customerDTO.getTrainingPlanId())
                    .orElseThrow(() -> new GlobalExceptionHandler.TrainingPlanNotFoundException("Plan de entrenamiento no encontrado"));
            existingCustomer.setTrainingPlan(trainingPlan);
        }

        Customer updatedCustomer = customerRepository.save(existingCustomer);
        return convertToResponseDTO(updatedCustomer);
    }

    public void deactivateCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.CustomerNotFoundException("Cliente no encontrado"));
        // customer.setActive(false);
        customerRepository.save(customer);
    }

    private void validateCustomerRequest(CustomerDTO.Request dto) {
        if (dto.getIdentificationNumber() == null) {
            throw new GlobalExceptionHandler.MissingRequiredFieldException("Número de identificación es obligatorio");
        }
        // Agregar más validaciones según sea necesario
    }

    private CustomerDTO.Response convertToResponseDTO(Customer customer) {
        CustomerDTO.Response response = new CustomerDTO.Response();
        // Campos de Person
        response.setIdentificationNumber(customer.getIdentificationNumber());
        response.setNames(customer.getNames());
        response.setLastNames(customer.getLastNames());
        response.setTypeId(customer.getTypeId().name());
        response.setDateBirth(customer.getDateBirth());
        response.setNumberPhone(customer.getNumberPhone());
        // Campos de Customer
        response.setWeight(customer.getWeight());
        response.setStature(customer.getStature());
        response.setAnamnesisId(customer.getAnamnesis() != null ? customer.getAnamnesis().getId() : null);
        response.setTrainingPlanId(customer.getTrainingPlan() != null ? customer.getTrainingPlan().getId() : null);
        response.setTrainingSessionIds(customer.getTrainingSessions().stream()
                .map(TrainingSession::getId)
                .collect(Collectors.toList()));
        return response;
    }
}