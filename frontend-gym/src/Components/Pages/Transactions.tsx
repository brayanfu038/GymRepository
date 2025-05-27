// src/components/TransactionForm.tsx
import React, { useState } from "react";
import "./Transactions.css";

const TransactionForm: React.FC = () => {
  const [type, setType] = useState<"Ingreso" | "Egreso">("Ingreso");
  const [formData, setFormData] = useState({
    fecha: "Hoy",
    titular: "",
    monto: "",
    descripcion: "",
    metodoPago: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando datos:", { ...formData, tipo: type });
    // Aquí se envía a backend o se guarda
  };

  return (
    <div className="transaction-container">
      <button className="volver-btn">← Volver</button>
      <h2>Registrar Transacción</h2>

      <div className="toggle-buttons">
        <button
          className={type === "Ingreso" ? "active" : ""}
          onClick={() => setType("Ingreso")}
        >
          Ingreso
        </button>
        <button
          className={type === "Egreso" ? "active" : ""}
          onClick={() => setType("Egreso")}
        >
          Egreso
        </button>
      </div>

      <form className="transaction-form" onSubmit={handleSubmit}>
        <label>Fecha</label>
        <input type="text" name="fecha" value={formData.fecha} readOnly />

        <label>Titular</label>
        <input type="text" name="titular" onChange={handleChange} />

        <label>Monto</label>
        <input type="text" name="monto" onChange={handleChange} />

        <label>Descripción</label>
        <input type="text" name="descripcion" onChange={handleChange} />

        <div className="payment-method">
          <p>Forma de pago</p>
          <label>
            <input
              type="radio"
              name="metodoPago"
              value="Efectivo"
              onChange={handleChange}
            />
            Efectivo
          </label>
          <label>
            <input
              type="radio"
              name="metodoPago"
              value="Transacción"
              onChange={handleChange}
            />
            Transacción
          </label>
          <label>
            <input
              type="radio"
              name="metodoPago"
              value="Tarjeta"
              onChange={handleChange}
            />
            Tarjeta
          </label>
        </div>

        <button className="submit-btn" type="submit">
          Guardar información
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
