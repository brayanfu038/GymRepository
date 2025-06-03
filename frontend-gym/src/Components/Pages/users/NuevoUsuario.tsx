import React, { useState } from "react";
import TopBar from "../../generals/TopBar";
import SideMenu from "../../generals/SideMenu";
import { FaPlus } from "react-icons/fa";
import "./NuevoUsuario.css";
import { useNavigate } from 'react-router-dom';
import { crearCliente } from "../../services/clienteService";

const NuevoUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    person: {
      names: "",
      lastNames: "",
      id: "",
      typeId: "",
      dateBirth: "",
      numberPhone: "",
    },
    weight: "",
    stature: "",
  });
  return (
    <div
      className="nuevo-container"
      style={{ backgroundColor: "#f8fafd", minHeight: "120%", width: "150%" }}
    >
      <TopBar />
      <div className="nuevo-content">
        <SideMenu />
        <div className="main-area centered-area">
          <button className="volver-btn" onClick={() => navigate(-1)}>&larr; Volver</button>
          <h2 className="titulo">Datos de usuario</h2>

          <div className="form-card">
            <div className="form-grid-2col">
              <div className="form-row">
                <label>Nombre</label>
                <input type="text" name="nombre" />
              </div>
              <div className="form-row">
                <label>Fecha inicio</label>
                <input type="date" name="fechaInicio" />
              </div>
              <div className="form-row">
                <label>Apellidos</label>
                <input type="text" name="apellidos" />
              </div>
              <div className="form-row">
                <label>Fecha de finalización</label>
                <input type="date" name="fechaFin" />
              </div>
              <div className="form-row">
                <label>Tipo de Identificación</label>
                <input type="text" name="tipoId" />
              </div>
              <div className="form-row">
                <label>Estatura (cm)</label>
                <input type="number" name="stature" />
              </div>
              <div className="form-row">
                <label>Identificación</label>
                <input type="text" name="identificacion" />
              </div>
              <div className="form-row">
                <label>Notas</label>
                <input type="text" name="notas" />
              </div>
              <div className="form-row">
                <label>Fecha de nacimiento</label>
                <input type="date" name="fechaNacimiento" />
              </div>
              <div className="form-row">
                <label>Objetivo</label>
                <input type="text" name="objetivo" />
              </div>
              <div className="form-row">
                <label>Peso (kg)</label>
                <input type="number" name="weight" />
              </div>
              <div className="form-row">
                <label>Teléfono</label>
                <input type="text" name="telefono" />
              </div>
            </div>

            <div className="frecuencia-selector">
              <label>
                <input type="radio" name="frecuencia" value="anual" /> Anual
              </label>
              <label>
                <input type="radio" name="frecuencia" value="trimestral" /> Trimestral
              </label>
              <label>
                <input type="radio" name="frecuencia" value="mensual" /> Mensual
              </label>
            </div>

            <div className="rutina-selector">
              <select name="rutina">
                <option value="">Selecciona rutina</option>
                <option value="Rutina Pierna Definición">Rutina Pierna Definición</option>
                <option value="Rutina Full Body">Rutina Full Body</option>
              </select>
              <button className="add-btn" onClick={() => navigate('/sesiones')}>
                <FaPlus />
              </button>
            </div>

            <table className="tabla-ejercicios">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre Rutina</th>
                  <th>Parte Cuerpo</th>
                  <th>Nota</th>
                  <th>Cantidad Ejercicios</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                {/* Este cuerpo puede llenarse dinámicamente si implementas lógica */}
              </tbody>
            </table>

            <div className="continuar-container">
              <button
                className="continuar-btn"
                onClick={() => navigate('/anamnesis')}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoUsuario;
