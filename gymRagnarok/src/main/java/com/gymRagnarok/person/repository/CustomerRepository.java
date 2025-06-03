package com.gymRagnarok.person.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gymRagnarok.person.domain.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    /**
     * Busca un cliente por su número de identificación.
     *
     * @param identificationNumber número de identificación del cliente
     * @return Optional que contiene el Customer si existe
     */
    Optional<Customer> findByIdentificationNumber(Long identificationNumber);

    /**
     * Busca todos los clientes cuyos nombres contengan (ignorando mayúsculas/minúsculas)
     * la cadena de texto proporcionada.
     *
     * @param names fragmento de los nombres a buscar
     * @return lista de clientes que coinciden
     */
    List<Customer> findByNamesContainingIgnoreCase(String names);

    /**
     * Busca todos los clientes cuyos apellidos contengan (ignorando mayúsculas/minúsculas)
     * la cadena de texto proporcionada.
     *
     * @param lastNames fragmento de los apellidos a buscar
     * @return lista de clientes que coinciden
     */
    List<Customer> findByLastNamesContainingIgnoreCase(String lastNames);

    /**
     * Busca todos los clientes asociados a un plan de entrenamiento dado.
     *
     * @param trainingPlanId ID del plan de entrenamiento
     * @return lista de clientes que tienen asignado ese plan
     */
    List<Customer> findByTrainingPlanId(Long trainingPlanId);

    /**
     * Busca todos los clientes que tengan una anamnesis con el ID proporcionado.
     *
     * @param anamnesisId ID de la anamnesis
     * @return lista de clientes relacionados con esa anamnesis
     */
    List<Customer> findByAnamnesisId(Long anamnesisId);
}
