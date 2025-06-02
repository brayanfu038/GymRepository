import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import './DashboardRutinas.css'; // Estilos compartidos

const NuevoEjercicio: React.FC = () => {
  const navigate = useNavigate();

  const [ejercicio, setEjercicio] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    sets: '',
    repeticiones: '',
  });

  const handleContinuar = () => {
    console.log('Ejercicio creado:', ejercicio);
    navigate(-1); // Regresa
  };

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM nuevo-ejercicio-area">

          {/* Botón de volver */}
          <div className="encabezado-rutina">
            <button className="volver-btn" onClick={() => navigate(-1)}>← Volver</button>
          </div>

          {/* ✅ Cuadro blanco con el título adentro */}
          <div className="tarjeta-ejercicio">
            <h2 className="titulo-ejercicio">Ejercicio</h2>

            <div className="fila-formulario">
                 
              <label>Id</label>
              <input
                type="text"
                value={ejercicio.id}
                onChange={(e) => setEjercicio({ ...ejercicio, id: e.target.value })}
              />
            </div>

            <div className="fila-formulario">
              <label>Nombre</label>
              <input
                type="text"
                value={ejercicio.nombre}
                onChange={(e) => setEjercicio({ ...ejercicio, nombre: e.target.value })}
              />
            </div>

            <div className="fila-formulario">
              <label>Descripción</label>
              <input
                type="text"
                value={ejercicio.descripcion}
                onChange={(e) => setEjercicio({ ...ejercicio, descripcion: e.target.value })}
              />
            </div>

            <div className="fila-formulario">
              <label>Sets</label>
              <input
                type="number"
                value={ejercicio.sets}
                onChange={(e) => setEjercicio({ ...ejercicio, sets: e.target.value })}
              />
            </div>

            <div className="fila-formulario">
              <label>Repeticiones</label>
              <input
                type="number"
                value={ejercicio.repeticiones}
                onChange={(e) => setEjercicio({ ...ejercicio, repeticiones: e.target.value })}
              />
            </div>

            <div className="btn-continuar-wrapper">
              <button className="guardar-btn" onClick={handleContinuar}>
                Continuar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NuevoEjercicio;
