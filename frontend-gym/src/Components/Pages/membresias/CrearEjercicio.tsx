import React, { useState } from 'react';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import { FaArrowLeft } from 'react-icons/fa';
import './CrearEjercicio.css';

const CrearEjercicio: React.FC = () => {
  const [formData, setFormData] = useState({
    id: 'E-100',
    nombre: '',
    descripcion: '',
    sets: '',
    repeticiones: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className="containerE"
    style={{ backgroundColor: "#f8fafd", minHeight: "20%", width: "190%" }}>
      <TopBar />
      <div className="contentE">
        <SideMenu />
        <div className="mainAreaE">
          <button className="volver-btnE"><FaArrowLeft /> Volver</button>
          <div className="form-cardE">
            <h2>Ejercicio</h2>
            <div className="form-gridE">
              <label>Id</label>
              <input type="text" name="id" value={formData.id} onChange={handleChange} readOnly />

              <label>Nombre</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="------" />

              <label>Descripción</label>
              <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="------" />

              <label>Sets</label>
              <input type="text" name="sets" value={formData.sets} onChange={handleChange} placeholder="------" />

              <label>Repeticiones</label>
              <input type="text" name="repeticiones" value={formData.repeticiones} onChange={handleChange} placeholder="------" />
            </div>
            <button className="continuar-btnE" onClick={handleSubmit}>Continuar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearEjercicio;
