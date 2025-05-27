import React from 'react';
import './AlertaConfirmacion.css';
import { MdWarning, MdDelete, MdCheckCircle } from 'react-icons/md';

interface AlertaConfirmacionProps {
  mensaje: string;
  visible: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
  tipo?: 'modificar' | 'eliminar'; // tipo de alerta
}

const AlertaConfirmacion: React.FC<AlertaConfirmacionProps> = ({
  mensaje,
  visible,
  onConfirmar,
  onCancelar,
  tipo = 'modificar',
}) => {
  if (!visible) return null;

  const iconos = {
    modificar: <MdWarning size={48} color="#FFA500" />,
    eliminar: <MdDelete size={48} color="red" />,
  };

  return (
    <div className="overlay-alerta">
      <div className="alerta-container">
        <div className="alerta-icono">
          {iconos[tipo]}
        </div>
        <p className="alerta-mensaje">{mensaje}</p>
        <div className="alerta-botones">
          <button className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
          <button className={`btn-confirmar ${tipo}`} onClick={onConfirmar}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertaConfirmacion;
