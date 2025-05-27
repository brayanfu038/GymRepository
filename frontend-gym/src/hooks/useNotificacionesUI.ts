import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TipoAccion = 'crear' | 'modificar' | 'eliminar';

export function useNotificacionesUI(defaultTipo: TipoAccion = 'crear') {
  const navigate = useNavigate();

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoAccion, setTipoAccion] = useState<TipoAccion>(defaultTipo);

  const mostrarConfirmacion = (accion: TipoAccion) => {
    setTipoAccion(accion);
    setMostrarAlerta(true);
  };

  const confirmarAccion = (callback?: () => void) => {
    let mensaje = '';
    switch (tipoAccion) {
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
    setMostrarAlerta(false);

    if (callback) callback();

    setTimeout(() => {
      setMostrarMensaje(false);
      navigate(-1);
    }, 2000);
  };

  return {
    mostrarAlerta,
    mostrarMensaje,
    mensaje,
    tipoAccion,
    setMostrarAlerta,
    mostrarConfirmacion,
    confirmarAccion,
    setMostrarMensaje,
  };
}
