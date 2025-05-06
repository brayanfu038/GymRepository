package com.gymRagnarok.dto;

import com.gymRagnarok.domain.TypeId;
import java.util.Date;

public class PersonDTO {

    // DTO para solicitudes (crear/actualizar)
    public static class Request {
        private String names;
        private String lastNames;
        private Integer identificationNumber;
        private TypeId typeId;
        private Date dateBirth;
        private String numberPhone;

        // Getters y Setters
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

    // DTO para respuestas (consulta)
    public static class Response {
        private Long id;
        private String names;
        private String lastNames;
        private Integer identificationNumber;
        private String typeId;
        private Date dateBirth;
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

        public String getTypeId() { return typeId; }
        public void setTypeId(String typeId) { this.typeId = typeId; }

        public Date getDateBirth() { return dateBirth; }
        public void setDateBirth(Date dateBirth) { this.dateBirth = dateBirth; }

        public String getNumberPhone() { return numberPhone; }
        public void setNumberPhone(String numberPhone) { this.numberPhone = numberPhone; }
    }
}