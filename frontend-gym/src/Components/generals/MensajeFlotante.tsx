import React from 'react';
import './MensajeFlotante.css';
import { MdCheckCircle } from 'react-icons/md';

interface MensajeFlotanteProps {
  mensaje: string;
  visible: boolean;
  onCerrar: () => void;
}

const MensajeFlotante: React.FC<MensajeFlotanteProps> = ({ mensaje, visible, onCerrar }) => {
  if (!visible) return null;

  return (
    <div className="overlay-alerta">
      <div className="alerta-container exito">
        <div className="alerta-icono">
          <MdCheckCircle size={48} color="green" />
        </div>
        <p className="alerta-mensaje">{mensaje}</p>
        <div className="alerta-botones">
          <button className="btn-confirmar modificar" onClick={onCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default MensajeFlotante;
