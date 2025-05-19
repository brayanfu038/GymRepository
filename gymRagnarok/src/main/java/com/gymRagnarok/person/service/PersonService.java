package com.gymRagnarok.person.service;

import com.gymRagnarok.person.domain.Person;

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

    public List<PersonDTO.Response> getAllPersons() {
        return personRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PersonDTO.Response getPersonByIdentificationNumber(Long identificationNumber) {
        Optional<Person> person = personRepository.findByIdentificationNumber(identificationNumber);
        return person.map(this::convertToDTO).orElse(null);
    }

    public void createPerson(PersonDTO.Request personDTO) {
        Person person = convertToEntity(personDTO);
        personRepository.save(person);
    }

    public void updatePerson(Long identificationNumber, PersonDTO.Request personDTO) {
        Person existingPerson = personRepository.findByIdentificationNumber(identificationNumber)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
        updateEntityFromDTO(personDTO, existingPerson);
        personRepository.save(existingPerson);
    }

    public void deletePerson(Long identificationNumber) {
        personRepository.deleteByIdentificationNumber(identificationNumber);
    }

    private PersonDTO.Response convertToDTO(Person person) {
        PersonDTO.Response dto = new PersonDTO.Response();
        dto.setId(person.getId()); // Asigna el ID de la entidad
        dto.setIdentificationNumber(person.getIdentificationNumber());
        dto.setNames(person.getNames());
        dto.setLastNames(person.getLastNames());
        dto.setTypeId(person.getTypeId().toString());
        dto.setDateBirth(person.getDateBirth()); // Directamente LocalDate
        dto.setNumberPhone(person.getNumberPhone());
        return dto;
    }

    private Person convertToEntity(PersonDTO.Request dto) {
        Person person = new Person();
        person.setIdentificationNumber(dto.getIdentificationNumber());
        person.setNames(dto.getNames());
        person.setLastNames(dto.getLastNames());
        person.setTypeId(dto.getTypeId());
        person.setDateBirth(dto.getDateBirth()); // Directamente LocalDate
        person.setNumberPhone(dto.getNumberPhone());
        return person;
    }

    private void updateEntityFromDTO(PersonDTO.Request dto, Person person) {
        if (dto.getNames() != null) person.setNames(dto.getNames());
        if (dto.getLastNames() != null) person.setLastNames(dto.getLastNames());
        if (dto.getTypeId() != null) person.setTypeId(dto.getTypeId());
        if (dto.getDateBirth() != null) person.setDateBirth(dto.getDateBirth());
        if (dto.getNumberPhone() != null) person.setNumberPhone(dto.getNumberPhone());
    }
}