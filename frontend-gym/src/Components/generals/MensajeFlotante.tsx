// src/components/MensajeFlotante.tsx
import React from 'react';
import './MensajeFlotante.css';
import { MdCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // importamos

interface MensajeFlotanteProps {
  mensaje: string;
  visible: boolean;
  onCerrar?: () => void;  // opcional, si quieres ejecutar algo extra
}

const MensajeFlotante: React.FC<MensajeFlotanteProps> = ({ mensaje, visible, onCerrar }) => {
  const navigate = useNavigate(); // hook de navegación

  if (!visible) return null;

  const handleClose = () => {
    if (onCerrar) onCerrar();
    navigate(-2); // vuelve atrás
  };

  return (
    <div className="overlay-alerta">
      <div className="alerta-container exito">
        <div className="alerta-icono">
          <MdCheckCircle size={48} color="green" />
        </div>
        <p className="alerta-mensaje">{mensaje}</p>
        <div className="alerta-botones">
          <button className="btn-confirmar modificar" onClick={handleClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MensajeFlotante;
