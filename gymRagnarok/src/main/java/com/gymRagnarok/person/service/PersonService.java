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

    public Optional<PersonDTO.Response> getPersonByIdentificationNumber(Long identificationNumber) {
        return personRepository.findByIdentificationNumber(identificationNumber)
                .map(this::convertToDTO);
    } 

    public PersonDTO.Response createPerson(PersonDTO.Request personDTO) {
        validatePersonRequest(personDTO);

        // Validar que no exista otra persona con el mismo número de identificación
        personRepository.findByIdentificationNumber(personDTO.getIdentificationNumber()).ifPresent(p -> {
            throw new IllegalArgumentException("Ya existe una persona con ese número de identificación");
        });

        Person person = convertToEntity(personDTO);
        return convertToDTO(personRepository.save(person));
    }

    public PersonDTO.Response updatePerson(Long identificationNumber, PersonDTO.Request personDTO) {
        validatePersonRequest(personDTO);

        Person existingPerson = personRepository.findByIdentificationNumber(identificationNumber)
                .orElseThrow(() -> new IllegalArgumentException("Persona no encontrada con ese número de identificación"));

        updateEntityFromDTO(personDTO, existingPerson);
        return convertToDTO(personRepository.save(existingPerson));
    }

    public void deletePerson(Long identificationNumber) {
        Person person = personRepository.findByIdentificationNumber(identificationNumber)
                .orElseThrow(() -> new IllegalArgumentException("Persona no encontrada para eliminar"));
        personRepository.delete(person);
    }

    private void validatePersonRequest(PersonDTO.Request dto) {
        if (dto.getIdentificationNumber() == null) {
            throw new IllegalArgumentException("Número de identificación es requerido");
        }
    }

    private PersonDTO.Response convertToDTO(Person person) {
        PersonDTO.Response dto = new PersonDTO.Response();
        dto.setId(person.getId());
        dto.setIdentificationNumber(person.getIdentificationNumber());
        dto.setNames(person.getNames());
        dto.setLastNames(person.getLastNames());
        dto.setTypeId(person.getTypeId().name()); // Enum a String
        dto.setDateBirth(person.getDateBirth());
        dto.setNumberPhone(person.getNumberPhone());
        return dto;
    }

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

    private void updateEntityFromDTO(PersonDTO.Request dto, Person person) {
        Optional.ofNullable(dto.getNames()).ifPresent(person::setNames);
        Optional.ofNullable(dto.getLastNames()).ifPresent(person::setLastNames);
        Optional.ofNullable(dto.getTypeId()).ifPresent(person::setTypeId);
        Optional.ofNullable(dto.getDateBirth()).ifPresent(person::setDateBirth);
        Optional.ofNullable(dto.getNumberPhone()).ifPresent(person::setNumberPhone);
    }
}
