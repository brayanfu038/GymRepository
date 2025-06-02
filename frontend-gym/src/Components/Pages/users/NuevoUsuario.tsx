import React from 'react';
import TopBar from '../../generals/TopBar';
import SideMenu from '../../generals/SideMenu';
import { FaPlus } from 'react-icons/fa';
import './NuevoUsuario.css';

const usuario = {
  nombre: 'Juan Carlos',
  apellidos: 'Gonzalez Martínez',
  tipoId: 'C.C.',
  identificacion: '46456789',
  fechaNacimiento: '13/07/2000',
  telefono: '3206547889',
  fechaInicio: '29/01/2024',
  fechaFin: '------',
  telefonoAdicional: '------',
  notas: '------',
  objetivo: 'Descripción del objetivo',
  rutina: 'Rutina Pierna Definición',
  ejercicios: [
    {
      nombre: 'Rutina Pesada H',
      parteCuerpo: 'Hombro',
      nota: 'Nivel avanzado',
      cantidad: 4,
      duracion: '60 min'
    }
  ]
};

const NuevoUsuario: React.FC = () => {
  return (
    <div className="nuevo-container">
      <TopBar />
      <div className="nuevo-content">
        <SideMenu />
        <div className="main-area centered-area">
          <button className="volver-btn">&larr; Volver</button>
          <h2 className="titulo">Datos de usuario</h2>

          <div className="form-card">
            <div className="form-grid-2col">
              <div className="form-row">
                <label>Nombre</label>
                <input type="text" value={usuario.nombre} readOnly />
              </div>
              <div className="form-row">
                <label>Fecha inicio</label>
                <input type="text" value={usuario.fechaInicio} readOnly />
              </div>
              <div className="form-row">
                <label>Apellidos</label>
                <input type="text" value={usuario.apellidos} readOnly />
              </div>
              <div className="form-row">
                <label>Fecha de finalización</label>
                <input type="text" value={usuario.fechaFin} readOnly />
              </div>
              <div className="form-row">
                <label>Tipo de Identificación</label>
                <input type="text" value={usuario.tipoId} readOnly />
              </div>
              <div className="form-row">
                <label>Número telefono</label>
                <input type="text" value={usuario.telefonoAdicional} readOnly />
              </div>
              <div className="form-row">
                <label>Identificación</label>
                <input type="text" value={usuario.identificacion} readOnly />
              </div>
              <div className="form-row">
                <label>Notas</label>
                <input type="text" value={usuario.notas} readOnly />
              </div>
              <div className="form-row">
                <label>Fecha de nacimiento</label>
                <input type="text" value={usuario.fechaNacimiento} readOnly />
              </div>
              <div className="form-row">
                <label>Objetivo</label>
                <input type="text" value={usuario.objetivo} readOnly />
              </div>
              <div className="form-row">
                <label>Teléfono</label>
                <input type="text" value={usuario.telefono} readOnly />
              </div>
            </div>

            <div className="frecuencia-selector">
              <label><input type="radio" name="frecuencia" checked readOnly /> Anual</label>
              <label><input type="radio" name="frecuencia" readOnly /> Trimestral</label>
              <label><input type="radio" name="frecuencia" readOnly /> Mensual</label>
            </div>

            <div className="rutina-selector">
          <select value={usuario.rutina} disabled>
            <option>{usuario.rutina}</option>
              </select>

              <button className="add-btn"><FaPlus /></button>
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
                {usuario.ejercicios.map((ej, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{ej.nombre}</td>
                    <td>{ej.parteCuerpo}</td>
                    <td>{ej.nota}</td>
                    <td>{ej.cantidad}</td>
                    <td>{ej.duracion}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="continuar-container">
              <button className="continuar-btn">Continuar</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NuevoUsuario;