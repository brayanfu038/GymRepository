import React, { useState, useEffect } from 'react';
import './CrearTransaccion.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import AlertaConfirmacion from '../../generals/AlertaConfirmacion';
import MensajeFlotante from '../../generals/MensajeFlotante';
import { useNotificacionesUI } from '../../../hooks/useNotificacionesUI';

const transaccionEjemplo = {
  idTransaccion: 'TX-001',
  titular: 'Juan Pérez',
  tipoTransaccion: 'Salida',
  valor: '150.00',
  formaPago: 'Transferencia',
  descripcion: 'Pago de servicios',
};

const ModificarTransaccion: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Hook de notificaciones configurado en modo "modificar"
  const {
    mostrarAlerta,
    setMostrarAlerta,
    mostrarConfirmacion,
    confirmarAccion,
    mensaje,
    mostrarMensaje
  } = useNotificacionesUI('modificar');

  const [formData, setFormData] = useState({ ...transaccionEjemplo });

  useEffect(() => {
    if (id) {
      // Aquí podrías cargar tus datos reales:
      // setFormData(fetchTransaccionPorId(id));
    }
  }, [id]);

  const tiposTransaccion = ['Entrada', 'Salida'];
  const formasPago = ['Efectivo', 'Transferencia', 'Tarjeta'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormaPagoClick = (forma: string) => {
    setFormData(prev => ({ ...prev, formaPago: forma }));
  };

  // Este handler lanza el modal de confirmación
  const handleModificarClick = () => {
    mostrarConfirmacion('modificar');
  };

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
          {/* Encabezado con botón Volver */}
          <div>
            <button className="volver-btnCP" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Volver
            </button>
            <h2 className="titulo-crearCP">MODIFICAR TRANSACCIÓN</h2>
          </div>

          {/* Card de edición */}
          <div className="crear-cardCP">
            <button className="cerrar-btnCP" onClick={() => navigate(-1)}>
              <IoMdClose size={20} />
            </button>

            <div className="crear-contenidoCP">
              {[
                { label: 'ID Transacción', name: 'idTransaccion', type: 'text' },
                { label: 'Titular', name: 'titular', type: 'text' },
                { label: 'Valor', name: 'valor', type: 'number' },
                { label: 'Descripción', name: 'descripcion', type: 'textarea' },
              ].map(field => (
                <div className="form-rowCP" key={field.name}>
                  <label htmlFor={field.name}>{field.label}:</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}

              {/* Tipo de Transacción */}
              <div className="form-rowCP">
                <label>Tipo de Transacción:</label>
                <div className="button-group">
                  {tiposTransaccion.map(tipo => (
                    <button
                      key={tipo}
                      type="button"
                      className={formData.tipoTransaccion === tipo ? 'btn-selected' : 'btn-unselected'}
                      onClick={() => setFormData(prev => ({ ...prev, tipoTransaccion: tipo }))}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              </div>

              {/* Forma de Pago */}
              <div className="form-rowCP">
                <label>Forma de Pago:</label>
                <div className="button-group">
                  {formasPago.map(forma => (
                    <button
                      key={forma}
                      type="button"
                      className={formData.formaPago === forma ? 'btn-selected' : 'btn-unselected'}
                      onClick={() => handleFormaPagoClick(forma)}
                    >
                      {forma}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Botón para lanzar el modal */}
            <div className="crear-accionesCP">
              <button className="aceptar-btnCP" onClick={handleModificarClick}>
                Modificar Transacción
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <AlertaConfirmacion
        mensaje="¿Seguro que deseas modificar esta transacción?"
        visible={mostrarAlerta}
        onCancelar={() => setMostrarAlerta(false)}
        onConfirmar={confirmarAccion}
        tipo="modificar"
      />

      {/* Mensaje flotante de éxito */}
      <MensajeFlotante
        mensaje={mensaje}
        visible={mostrarMensaje}
        onCerrar={() => {}}
      />
    </div>
  );
};

export default ModificarTransaccion;
