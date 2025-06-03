import { useState } from 'react';

type TipoAccion = 'crear' | 'modificar' | 'eliminar';

export function useNotificacionesUI() {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const mostrarExito = (accion: TipoAccion) => {
    let texto = '';

    switch (accion) {
      case 'crear':
        texto = 'Creado correctamente.';
        break;
      case 'modificar':
        texto = 'Actualizado correctamente.';
        break;
      case 'eliminar':
        texto = 'Eliminado correctamente.';
        break;
    }

    setMensaje(texto);
    setMostrarMensaje(true);

    setTimeout(() => {
      setMostrarMensaje(false);
    }, 2000);
  };

  const mostrarMensajePersonalizado = (texto: string) => {
    setMensaje(texto);
    setMostrarMensaje(true);

    setTimeout(() => {
      setMostrarMensaje(false);
    }, 2000);
  };

  return {
    mostrarMensaje,
    mensaje,
    mostrarExito,
    mostrarNotificacion: mostrarMensajePersonalizado,
  };
}
