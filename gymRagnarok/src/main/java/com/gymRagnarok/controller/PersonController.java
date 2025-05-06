package com.gymRagnarok.controller;
import com.gymRagnarok.dto.PersonDTO;
import com.gymRagnarok.service.PersonService;
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

    @GetMapping
    public List<PersonDTO.Response> listPersons() {
        return personService.getAllPersons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonDTO.Response> getPerson(@PathVariable Long id) {
        PersonDTO.Response person = personService.getPersonById(id);
        return person != null ? ResponseEntity.ok(person) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Void> createPerson(@RequestBody PersonDTO.Request personaDTO) {
        personService.createPerson(personaDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePerson(@PathVariable Long id, @RequestBody PersonDTO.Request personaDTO) {
        personService.updatePerson(id, personaDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
        return ResponseEntity.noContent().build();
    }
}