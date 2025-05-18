package com.gymRagnarok.person.service;

import com.gymRagnarok.person.domain.Person;
import com.gymRagnarok.person.domain.TypeId;
import com.gymRagnarok.person.dto.PersonDTO;
import com.gymRagnarok.person.repository.PersonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    // Obtener todas las personas
    public List<PersonDTO.Response> getAllPersons() {
        return personRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Buscar persona por número de identificación
    public PersonDTO.Response getPersonByIdentificationNumber(Long identificationNumber) {
        Optional<Person> person = personRepository.findByIdentificationNumber(identificationNumber);
        return person.map(this::convertToDTO).orElse(null);
    }

    // Crear nueva persona
    public void createPerson(PersonDTO.Request personDTO) {
        Person person = convertToEntity(personDTO);
        personRepository.save(person);
    }

    // Actualizar persona existente
    public void updatePerson(Long identificationNumber, PersonDTO.Request personDTO) {
        Person existingPerson = personRepository.findByIdentificationNumber(identificationNumber)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        updateEntityFromDTO(personDTO, existingPerson);
        personRepository.save(existingPerson);
    }

    // Eliminar persona
    public void deletePerson(Long identificationNumber) {
        personRepository.deleteByIdentificationNumber(identificationNumber);
    }

    // Conversión de Entidad a DTO (Response)
    private PersonDTO.Response convertToDTO(Person person) {
        PersonDTO.Response dto = new PersonDTO.Response();
        dto.setIdentificationNumber(person.getIdentificationNumber());
        dto.setNames(person.getNames());
        dto.setLastNames(person.getLastNames());
        dto.setTypeId(person.getTypeId().toString());
        dto.setDateBirth(person.getDateBirth());
        dto.setNumberPhone(person.getNumberPhone());
        return dto;
    }

    // Conversión de DTO (Request) a Entidad
    private Person convertToEntity(PersonDTO.Request dto) {
        Person person = new Person();
        person.setIdentificationNumber(dto.getIdentificationNumber());
        person.setNames(dto.getNames());
        person.setLastNames(dto.getLastNames());
        person.setTypeId(dto.getTypeId());
        person.setDateBirth(dto.getDateBirth());
        person.setNumberPhone(dto.getNumberPhone());
        return person;
    }

    // Actualizar entidad desde DTO
    private void updateEntityFromDTO(PersonDTO.Request dto, Person person) {
        if (dto.getNames() != null) person.setNames(dto.getNames());
        if (dto.getLastNames() != null) person.setLastNames(dto.getLastNames());
        if (dto.getTypeId() != null) person.setTypeId(dto.getTypeId());
        if (dto.getDateBirth() != null) person.setDateBirth(dto.getDateBirth());
        if (dto.getNumberPhone() != null) person.setNumberPhone(dto.getNumberPhone());
    }
}