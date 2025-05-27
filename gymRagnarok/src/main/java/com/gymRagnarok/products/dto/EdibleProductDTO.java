package com.gymRagnarok.products.dto;

import java.time.LocalDate;

public class EdibleProductDTO extends ProductDTO{

    public static class Request extends ProductDTO.Request {

        private String batch;
        private LocalDate expirationDate;

        public String getBatch() {
            return batch;
        }

        public void setBatch(String batch) {
            this.batch = batch;
        }

        public LocalDate getExpirationDate() {
            return expirationDate;
        }

        public void setExpirationDate(LocalDate expirationDate) {
            this.expirationDate = expirationDate;
        }
    }

    public static class Response extends ProductDTO.Response {

        private String batch;
        private LocalDate expirationDate;

        public String getBatch() {
            return batch;
        }

        public void setBatch(String batch) {
            this.batch = batch;
        }

        public LocalDate getExpirationDate() {
            return expirationDate;
        }

        public void setExpirationDate(LocalDate expirationDate) {
            this.expirationDate = expirationDate;
        }
    }
}
