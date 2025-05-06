package com.gymRagnarok.service;

import com.gymRagnarok.domain.Person;
import com.gymRagnarok.domain.TypeId;
import com.gymRagnarok.dto.PersonDTO;
import com.gymRagnarok.repository.PersonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
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

    public PersonDTO.Response getPersonById(Long id) {
        return personRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public void createPerson(PersonDTO.Request personDTO) {
        Person person = convertToEntity(personDTO);
        personRepository.save(person);
    }

    public void updatePerson(Long id, PersonDTO.Request personDTO) {
        Person existingPerson = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
        updateEntityFromDTO(personDTO, existingPerson);
        personRepository.save(existingPerson);
    }

    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }

    // Métodos de conversión
    private PersonDTO.Response convertToDTO(Person person) {
        PersonDTO.Response dto = new PersonDTO.Response();
        dto.setId(person.getId());
        dto.setNames(person.getNames());
        dto.setLastNames(person.getLastNames());
        dto.setIdentificationNumber(person.getIdentificationNumber());
        dto.setTypeId(person.getTypeId().toString());
        dto.setDateBirth(person.getDateBirth());
        dto.setNumberPhone(person.getNumberPhone());
        return dto;
    }

    private Person convertToEntity(PersonDTO.Request dto) {
        Person person = new Person();
        person.setNames(dto.getNames());
        person.setLastNames(dto.getLastNames());
        person.setIdentificationNumber(dto.getIdentificationNumber());
        person.setTypeId(dto.getTypeId());
        person.setDateBirth(dto.getDateBirth());
        person.setNumberPhone(dto.getNumberPhone());
        return person;
    }

    private void updateEntityFromDTO(PersonDTO.Request dto, Person person) {
        person.setNames(dto.getNames());
        person.setLastNames(dto.getLastNames());
        person.setIdentificationNumber(dto.getIdentificationNumber());
        person.setTypeId(dto.getTypeId());
        person.setDateBirth(dto.getDateBirth());
        person.setNumberPhone(dto.getNumberPhone());
    }
}