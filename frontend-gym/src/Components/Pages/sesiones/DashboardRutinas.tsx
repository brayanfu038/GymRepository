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
    // Esto puede eliminarse si ya no vas a usar ejercicios
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
            <div className="fila-form">
              <label>Nombre Rutina</label>
              <input
                type="text"
                value={nombreRutina}
                onChange={(e) => setNombreRutina(e.target.value)}
              />
            </div>

            <div className="fila-form">
              <label>Parte del cuerpo a trabajar</label>
              <input
                type="text"
                value={parteCuerpo}
                onChange={(e) => setParteCuerpo(e.target.value)}
              />
            </div>

            <div className="fila-form">
              <label>Notas</label>
              <input
                type="text"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
              />
            </div>

            <div className="fila-form">
              <label>Duración</label>
              <input
                type="text"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
              />
            </div>

            <div className="fila-form">
              <label>Ejercicio</label>
              <input
                type="text"
                placeholder="Nombre"
                value={nuevoEjercicio.nombre}
                onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="ID"
                value={nuevoEjercicio.id}
                onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, id: e.target.value })}
              />
              <input
                type="text"
                placeholder="Descripción"
                value={nuevoEjercicio.descripcion}
                onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, descripcion: e.target.value })}
              />
              <input
                type="number"
                placeholder="Sets"
                value={nuevoEjercicio.sets}
                onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, sets: +e.target.value })}
              />
              <input
                type="number"
                placeholder="Repeticiones"
                value={nuevoEjercicio.repeticiones}
                onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, repeticiones: +e.target.value })}
              />
              <button onClick={agregarEjercicio}>+</button>
            </div>

            <button className="guardar-btn" onClick={guardarRutina}>Guardar información</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRutinas;
