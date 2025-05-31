// src/Components/Pages/sesiones/DashboardRutinas.tsx
import React, { useState } from 'react';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import './DashboardRutinas.css';
import { useNavigate } from 'react-router-dom';

const DashboardRutinas: React.FC = () => {
  const navigate = useNavigate();

  const [nombreRutina, setNombreRutina] = useState('');
  const [parteCuerpo, setParteCuerpo] = useState('');
  const [notas, setNotas] = useState('');
  const [duracion, setDuracion] = useState('');
  const [nuevoEjercicio, setNuevoEjercicio] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    sets: 0,
    repeticiones: 0,
  });

  const agregarEjercicio = () => {
    console.log('Ejercicio agregado (simulado)', nuevoEjercicio);
    setNuevoEjercicio({ id: '', nombre: '', descripcion: '', sets: 0, repeticiones: 0 });
  };

  const guardarRutina = () => {
    console.log({
      nombreRutina,
      parteCuerpo,
      notas,
      duracion,
    });
  };

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
          <div className="encabezado-rutina">
            <button className="volver-btn" onClick={() => navigate(-1)}>← Volver</button>
            <h1>Rutina</h1>
          </div>

          <div className="formulario-rutina">
            <div className="guardar-boton-wrapper">
              <button className="guardar-btn" onClick={guardarRutina}>
                Guardar información
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="nombreRutina" className="block text-sm font-medium text-gray-700">
                Nombre Rutina
              </label>
              <input
                type="text"
                id="nombreRutina"
                name="nombreRutina"
                placeholder="Tren inferior"
                value={nombreRutina}
                onChange={(e) => setNombreRutina(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="fila-flex">
              <div className="fila-form">
                <label htmlFor="parteCuerpo">Parte del cuerpo a trabajar</label>
                <select
                  id="parteCuerpo"
                  value={parteCuerpo}
                  onChange={(e) => setParteCuerpo(e.target.value)}
                  className="select-parte"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Piernas">Piernas</option>
                  <option value="Espalda">Espalda</option>
                  <option value="Pecho">Pecho</option>
                  <option value="Brazos">Brazos</option>
                  <option value="Abdomen">Abdomen</option>
                </select>
              </div>

              <div className="fila-form notas-form">
                <label htmlFor="notas">Notas</label>
                <textarea
                  id="notas"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Ej: Realizar estiramiento previo..."
                  className="textarea-notas"
                ></textarea>
              </div>
            </div>
            <div className="fila-form">
              <label htmlFor="ejercicio">Ejercicio</label>
              <select
                id="ejercicio"
                value={nuevoEjercicio.nombre}
                onChange={(e) =>
                  setNuevoEjercicio({ ...nuevoEjercicio, nombre: e.target.value })
                }
                className="select-ejercicio"
              >
                <option value="">Selecciona un ejercicio</option>
                <option value="Bulgaras">Búlgaras</option>
                <option value="Hip-Trust">Hip-Trust</option>
                <option value="Peso Muerto">Peso Muerto</option>
                <option value="Zancadas">Zancadas</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRutinas;
