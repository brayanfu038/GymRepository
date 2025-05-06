package com.gymRagnarok.domain;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "persons")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "person_type", discriminatorType = DiscriminatorType.STRING)
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "names", nullable = false, length = 100)
    private String names;

    @Column(name = "last_names", nullable = false, length = 100)
    private String lastNames;

    @Column(name = "identification_number", unique = true, nullable = false)
    private Integer identificationNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_id", nullable = false, length = 20)
    private TypeId typeId;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_birth")
    private Date dateBirth;

    @Column(name = "number_phone", length = 20)
    private String numberPhone;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNames() { return names; }
    public void setNames(String names) { this.names = names; }
    public String getLastNames() { return lastNames; }
    public void setLastNames(String lastNames) { this.lastNames = lastNames; }
    public Integer getIdentificationNumber() { return identificationNumber; }
    public void setIdentificationNumber(Integer identificationNumber) { this.identificationNumber = identificationNumber; }
    public TypeId getTypeId() { return typeId; }
    public void setTypeId(TypeId typeId) { this.typeId = typeId; }
    public Date getDateBirth() { return dateBirth; }
    public void setDateBirth(Date dateBirth) { this.dateBirth = dateBirth; }
    public String getNumberPhone() { return numberPhone; }
    public void setNumberPhone(String numberPhone) { this.numberPhone = numberPhone; }
}