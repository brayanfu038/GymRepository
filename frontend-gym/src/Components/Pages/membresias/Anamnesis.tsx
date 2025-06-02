import React, { useState } from 'react';
import TopBar from '../../generals/TopBar';
import SideMenu from '../../generals/SideMenu';
import './Anamnesis.css';

const preguntas = [
  {
    seccion: 'Sufre usted o ha sufrido durante el ejercicio de:',
    items: [
      'Convulsiones, desmayos o dolor de cabeza',
      'Dolor muscular o articular que limite sus actividades',
      'Dolor en el pecho o dificultad para respirar',
    ],
  },
  {
    seccion: 'Le han diagnosticado alguna de las siguientes enfermedades',
    items: [
      'Infarto de miocardio o dolor de cabeza',
      'Hipertensión arterial',
      'Diabetes',
      'Colesterol o Triglicéridos altos',
    ],
  },
  {
    seccion: 'En los ultimos 6 meses',
    items: [
      'Ha consultado el medico por una emergencia o a estado hospitalizado',
      'Le han oracticado alguna cirugia',
    ],
  },
];

const Anamnesis = () => {
  const [respuestas, setRespuestas] = useState<{ [key: string]: string }>({});

  const toggleRespuesta = (pregunta: string, valor: 'Si' | 'No') => {
    setRespuestas((prev) => ({ ...prev, [pregunta]: valor }));
  };

  return (
    <div className="anamnesis-container"
    style={{ backgroundColor: "#f8fafd", minHeight: "120%", width: "150%" }}>
      <TopBar />
      <div className="anamnesis-content">
        <SideMenu />
        <div className="anamnesis-main">
          <button className="volver-btn">&larr; Volver</button>
          <h2 className="anamnesis-title">Anamnesis</h2>
          <div className="anamnesis-card">
            {preguntas.map((grupo, idx) => (
              <div key={idx} className="anamnesis-section">
                <h4>{grupo.seccion}</h4>
                {grupo.items.map((item, i) => (
                  <div key={i} className="anamnesis-pregunta">
                    <span>{item}</span>
                    <div className="toggle-container">
                      <button
                        className={`toggle-btn ${
                          respuestas[item] === 'Si' ? 'selected' : ''
                        }`}
                        onClick={() => toggleRespuesta(item, 'Si')}
                      >
                        Si
                      </button>
                      <button
                        className={`toggle-btn ${
                          respuestas[item] === 'No' ? 'selected' : ''
                        }`}
                        onClick={() => toggleRespuesta(item, 'No')}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div className="continuar-container">
              <button className="continuar-btn">Continuar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anamnesis;
