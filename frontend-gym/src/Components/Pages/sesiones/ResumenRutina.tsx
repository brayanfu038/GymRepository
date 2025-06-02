import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import './ResumenRutina.css';

const ResumenRutina: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nombreRutina, parteCuerpo, notas, duracion, ejercicios } = location.state || {};

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM resumen-wrapper">
          <div className="resumen-ficha">
            <h3 className="resumen-titulo">Plan de entrenamiento</h3>

            <div className="resumen-datos">
              <p><strong>Nombre de la rutina:</strong> {nombreRutina}</p>
              <p><strong>Parte a entrenar:</strong> {parteCuerpo}</p>
              <p><strong>Frecuencia:</strong> {notas}</p>
              <p><strong>Duración:</strong> {duracion}</p>
            </div>

            <div className="resumen-ejercicios">
              <strong>Ejercicios a realizar:</strong>
              <ol>
                {ejercicios?.map((ej: any, idx: number) => (
                  <li key={idx}>
                    {ej.nombre} ({ej.descripcion})
                  </li>
                ))}
              </ol>
            </div>

            <div className="btn-aceptar-wrapper">
              <button className="btn-verde" onClick={() => navigate(-1)}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenRutina;
