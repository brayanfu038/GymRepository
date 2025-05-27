// src/components/GenerarReporte.tsx
import React, { useState } from 'react';
import './GenerarReporte.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';

const GenerarReporte: React.FC = () => {
  const navigate = useNavigate();

  const [tipoMovimiento, setTipoMovimiento] = useState<'Ingreso' | 'Egreso'>('Ingreso');
  const [fecha, setFecha] = useState<string>(new Date().toISOString().slice(0, 10));
  const [periodo, setPeriodo] = useState<'Diario' | 'Semanal' | 'Mensual' | 'Anual'>('Diario');

  const handleSubmit = () => {
    alert(JSON.stringify({ tipoMovimiento, fecha, periodo }, null, 2));
    navigate(-1);
  };

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
          {/* Encabezado */}
          <div>
            <button className="volver-btnCP" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Volver
            </button>
            <h2 className="titulo-crearCP">GENERAR REPORTE</h2>
          </div>

          {/* Card */}
          <div className="crear-cardCP">
            <button className="cerrar-btnCP" onClick={() => navigate(-1)}>
              <IoMdClose size={20} />
            </button>

            <div className="crear-contenidoCP">
              {/* Ingreso / Egreso */}
              <div className="form-rowCP">
                <label>Tipo de Movimiento:</label>
                <div className="button-group">
                  {['Ingreso', 'Egreso'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={tipoMovimiento === t ? 'btn-selected' : 'btn-unselected'}
                      onClick={() => setTipoMovimiento(t as 'Ingreso' | 'Egreso')}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Fecha */}
              <div className="form-rowCP">
                <label htmlFor="fecha">Fecha:</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                />
              </div>

              {/* Periodo */}
              <div className="form-rowCP">
                <label>Periodo:</label>
                <div className="button-group">
                  {['Diario','Semanal','Mensual','Anual'].map(p => (
                    <button
                      key={p}
                      type="button"
                      className={periodo === p ? 'btn-selected' : 'btn-unselected'}
                      onClick={() => setPeriodo(p as any)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="crear-accionesCP">
              <button className="aceptar-btnCP" onClick={handleSubmit}>
                Generar Reporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerarReporte;
