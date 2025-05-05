// PersonController.java
package com.gymRagnarok.controller;

import com.gymRagnarok.dto.PersonDTO;
import com.gymRagnarok.service.PersonService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/personas")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public String listPersons(Model model) {
        model.addAttribute("personas", personService.getAllPersons());
        return "Personas";
    }

    @GetMapping("/crear")
    public String showCreateForm(Model model) {
        model.addAttribute("personaDTO", new PersonDTO.Request());
        return "forms/FormPersona";
    }

    @PostMapping("/crear")
    public String createPerson(@ModelAttribute PersonDTO.Request personaDTO) {
        personService.createPerson(personaDTO);
        return "redirect:/personas";
    }

    @GetMapping("/editar/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        PersonDTO.Response personaDTO = personService.getPersonById(id);
        model.addAttribute("personaDTO", personaDTO);
        return "forms/FormPersona";
    }

    @PostMapping("/editar/{id}")
    public String updatePerson(@PathVariable Long id, @ModelAttribute PersonDTO.Request personaDTO) {
        personService.updatePerson(id, personaDTO);
        return "redirect:/personas";
    }

    @GetMapping("/eliminar/{id}")
    public String deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
        return "redirect:/personas";
    }
}