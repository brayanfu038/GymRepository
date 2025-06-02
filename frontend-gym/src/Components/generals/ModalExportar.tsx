// src/Components/Common/ModalExportar.tsx
import React, { useEffect } from 'react';
import './ModalExportar.css';

const ModalExportar: React.FC = () => {
  useEffect(() => {
    const cerrarAlHacerClickFuera = (e: MouseEvent) => {
      const modal = document.getElementById('modal-exportar');
      const contenido = document.querySelector('.modal-contenido');
      if (modal && contenido && !contenido.contains(e.target as Node)) {
        modal.classList.remove('mostrar');
        setTimeout(() => {
          if (modal) modal.style.display = 'none';
        }, 300);
      }
    };

    document.addEventListener('click', cerrarAlHacerClickFuera);
    return () => document.removeEventListener('click', cerrarAlHacerClickFuera);
  }, []);

  const handleCerrar = () => {
    const modal = document.getElementById('modal-exportar');
    if (modal) {
      modal.classList.remove('mostrar');
      setTimeout(() => {
        if (modal) modal.style.display = 'none';
      }, 300);
    }
  };

  return (
    <div id="modal-exportar" className="modal-exportar mostrar">
      <div className="modal-contenido">
        <h2>¿Cómo deseas exportar el reporte?</h2>
        <div className="botones-exportar">
          <button className="btn-excel">Exportar a Excel</button>
          <button className="btn-pdf">Exportar a PDF</button>
        </div>
        <button className="cerrar-modal" onClick={handleCerrar}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalExportar;
