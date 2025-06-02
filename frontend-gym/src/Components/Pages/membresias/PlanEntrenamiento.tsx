import React from 'react';
import './PlanEntrenamiento.css';
import TopBar from '../../generals/TopBar';
import SideMenu from '../../generals/SideMenu';
import { useNavigate } from 'react-router-dom';

const PlanEntrenamiento: React.FC = () => {
  const navigate = useNavigate();

  // Datos simulados que vienen del backend
  const datos = {
    cliente: 'Paola Cuervo',
    identificacion: '123456',
    membresia: 'Mensual',
    parte: 'Piernas',
    frecuencia: '1 vez por semana',
    duracion: '50 minutos',
    ejercicios: [
      'Sentadillas clásicas (Bodyweight Squats o con peso)',
      'Estocadas hacia adelante (Forward Lunges)',
      'Peso muerto rumano (Romanian Deadlifts)',
      'Step-ups (Subida a banco o plataforma)',
      'Zancadas inversas (Reverse Lunges)',
      'Elevación de talones (Calf Raises)',
    ]
  };

  return (
    <div className="containerPE"style={{ backgroundColor: "#f8fafd", minHeight: "120%", width: "175%" }}>
      <TopBar />
      <div className="contentPE">
        <SideMenu />
        <div className="mainAreaPE">
          <button className="volver-btnPE" onClick={() => navigate(-1)}>
            ← Volver
          </button>

          <div className="modalPE">
            <div className="modal-headerPE">
              <h3>Plan de entrenamiento</h3>
              <button className="close-btnPE" onClick={() => navigate(-1)}>✕</button>
            </div>

            <div className="modal-bodyPE">
              <p><strong>Nombre del Cliente:</strong> <span className="valor-dinamico">{datos.cliente}</span></p>
              <p><strong>No. Identificación:</strong> <span className="valor-dinamico">{datos.identificacion}</span></p>
              <p><strong>Tipo membresía:</strong> <span className="valor-dinamico">{datos.membresia}</span></p>
              <p><strong>Parte a entrenar:</strong> <span className="valor-dinamico">{datos.parte}</span></p>
              <p><strong>Frecuencia:</strong> <span className="valor-dinamico">{datos.frecuencia}</span></p>
              <p><strong>Duración:</strong> <span className="valor-dinamico">{datos.duracion}</span></p>

              <p><strong>Ejercicios a realizar:</strong></p>
              <ol>
                {datos.ejercicios.map((ejercicio, index) => (
                  <li key={index}>{ejercicio}</li>
                ))}
              </ol>

              <button className="aceptar-btnPE" onClick={() => navigate(-1)}>
                Aceptar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlanEntrenamiento;
