package com.gymRagnarok.products.dto;

import java.time.LocalDate;
import java.util.Date;

public class EdibleProductDTO extends ProductDTO {

    public static class Request extends ProductDTO.Request {

        private String batch;
        private Date expirationDate;

        public String getBatch() {
            return batch;
        }

        public void setBatch(String batch) {
            this.batch = batch;
        }

        public Date getExpirationDate() {
            return expirationDate;
        }

        public void setExpirationDate(Date expirationDate) {
            this.expirationDate = expirationDate;
        }
    }

    public static class Response extends ProductDTO.Response {

        private String batch;
        private Date expirationDate;

        public String getBatch() {
            return batch;
        }

        public void setBatch(String batch) {
            this.batch = batch;
        }

        public Date getExpirationDate() {
            return expirationDate;
        }

        public void setExpirationDate(Date expirationDate) {
            this.expirationDate = expirationDate;
        }
    }
}
