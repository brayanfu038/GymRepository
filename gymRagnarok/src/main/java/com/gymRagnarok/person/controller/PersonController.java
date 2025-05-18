package com.gymRagnarok.person.controller;
import com.gymRagnarok.person.dto.PersonDTO;
import com.gymRagnarok.person.service.PersonService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    // Obtener todas las personas
    @GetMapping
    public ResponseEntity<List<PersonDTO.Response>> getAllPersons() {
        List<PersonDTO.Response> persons = personService.getAllPersons();
        return ResponseEntity.ok(persons);
    }

    // Obtener persona por número de identificación
    @GetMapping("/{identificationNumber}")
    public ResponseEntity<PersonDTO.Response> getPerson(
            @PathVariable Long identificationNumber) {
        PersonDTO.Response person = personService.getPersonByIdentificationNumber(identificationNumber);
        return person != null ?
                ResponseEntity.ok(person) :
                ResponseEntity.notFound().build();
    }

    // Crear nueva persona
    @PostMapping
    public ResponseEntity<Void> createPerson(
            @Valid @RequestBody PersonDTO.Request personDTO) {
        personService.createPerson(personDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Actualizar persona existente
    @PutMapping("/{identificationNumber}")
    public ResponseEntity<Void> updatePerson(
            @PathVariable Long identificationNumber,
            @Valid @RequestBody PersonDTO.Request personDTO) {

        if (!identificationNumber.equals(personDTO.getIdentificationNumber())) {
            return ResponseEntity.badRequest().build();
        }

        personService.updatePerson(identificationNumber, personDTO);
        return ResponseEntity.ok().build();
    }

    // Eliminar persona
    @DeleteMapping("/{identificationNumber}")
    public ResponseEntity<Void> deletePerson(
            @PathVariable Long identificationNumber) {
        personService.deletePerson(identificationNumber);
        return ResponseEntity.noContent().build();
    }
}