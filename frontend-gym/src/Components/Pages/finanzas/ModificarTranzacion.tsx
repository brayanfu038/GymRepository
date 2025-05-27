import React, { useState, useEffect } from 'react';
import './CrearTransaccion.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import MensajeFlotante from '../../generals/MensajeFlotante';
import { useNotificacionesUI } from '../../../hooks/useNotificacionesUI';
import AlertaConfirmacion from '../../generals/AlertaConfirmacion';

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
  const { id } = useParams(); // si se pasa por URL como /transacciones/modificar/:id

  const {
    mensaje,
    mostrarMensaje,
    mostrarAlerta, // disponible si se desea usar
    confirmarAccion,
  } = useNotificacionesUI('modificar');

  const [formData, setFormData] = useState({ ...transaccionEjemplo });

  // Simular fetch por ID (opcional si ya tienes datos)
  useEffect(() => {
    if (id) {
      // Aquí iría la lógica para cargar la transacción por ID
      // setFormData(fetchTransaccion(id))
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

  const handleSubmit = () => {
    confirmarAccion(); // Muestra mensaje "Transacción modificada correctamente"
  };

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
          <div>
            <button className="volver-btnCP" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Volver
            </button>
            <h2 className="titulo-crearCP">MODIFICAR TRANSACCIÓN</h2>
          </div>

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

            <div className="crear-accionesCP">
              <button className="aceptar-btnCP" onClick={handleSubmit}>
                Modificar Transacción
              </button>
            </div>
          </div>
        </div>
      </div>

      <MensajeFlotante
        mensaje={mensaje}
        visible={mostrarMensaje}
        onCerrar={() => {}}
      />
    
    </div>
  );
};

export default ModificarTransaccion;
