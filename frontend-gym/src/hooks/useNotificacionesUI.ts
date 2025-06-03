import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TipoAccion = 'crear' | 'modificar' | 'eliminar';

export function useNotificacionesUI() {
  const navigate = useNavigate();

  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const mostrarExito = (accion: TipoAccion) => {
    let mensaje = '';

    switch (accion) {
      case 'crear':
        mensaje = 'Creado correctamente.';
        break;
      case 'modificar':
        mensaje = 'Actualizado correctamente.';
        break;
      case 'eliminar':
        mensaje = 'Eliminado correctamente.';
        break;
    }

    setMensaje(mensaje);
    setMostrarMensaje(true);

    setTimeout(() => {
      setMostrarMensaje(false);
      navigate(-1);
    }, 2000);
  };

  return {
    mostrarMensaje,
    mensaje,
    mostrarExito,
  };
}
