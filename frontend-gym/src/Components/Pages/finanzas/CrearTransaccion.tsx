import React, { useState } from 'react';
import './CrearTransaccion.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import MensajeFlotante from '../../generals/MensajeFlotante';
import { useNotificacionesUI } from '../../../hooks/useNotificacionesUI';
import TransactionService from '../../../service/transaction.service';

const CrearTransaccion: React.FC = () => {
  const navigate = useNavigate();

  const {
    mostrarMensaje,
    mensaje,
    mostrarNotificacion
  } = useNotificacionesUI();

  const [formData, setFormData] = useState({
    idTransaction: '',
    date: '',
    value: '',
    description: '',
    typeTransaction: 'ENTRADA',
    pay: 'CASH',
  });

  const tiposTransaccion = [
    { label: 'Entrada', value: 'ENTRADA' },
    { label: 'Salida', value: 'SALIDA' }
  ];

  const formasPago = [
  { label: 'Efectivo', value: 'EFECTIVO' },
  { label: 'Transferencia', value: 'TRANSACCION' },
  { label: 'Tarjeta Débito', value: 'TARJETA_DEBITO' },
  { label: 'Tarjeta Crédito', value: 'TARJETA_CREDITO' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const transaction = {
        idTransaction: parseInt(formData.idTransaction),
        date: `${formData.date}T00:00:00`, // string en formato yyyy-MM-dd
        value: parseFloat(formData.value),
        description: formData.description,
        typeTransaction: formData.typeTransaction as 'ENTRADA' | 'SALIDA',
        pay: formData.pay as 'TARJETA_CREDITO' | 'EFECTIVO' | 'TRANSACCION' | 'TARJETA_DEBITO'
      };

      await TransactionService.create(transaction);
      mostrarNotificacion('✅ Transacción creada correctamente');
      navigate('/transacciones'); // cambia según tu routing
    } catch (error: any) {
      mostrarNotificacion(`❌ ${error.message}`);
    }
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
            <h2 className="titulo-crearCP">CREAR TRANSACCIÓN</h2>
          </div>

          <div className="crear-cardCT">
            <button className="cerrar-btnCP" onClick={() => navigate(-1)}>
              <IoMdClose size={20} />
            </button>

            <div className="crear-contenidoCP">
              {[ 
                { label: 'ID Transacción', name: 'idTransaction', type: 'text' },
                { label: 'Fecha', name: 'date', type: 'date' },
                { label: 'Valor', name: 'value', type: 'number' },
                { label: 'Descripción', name: 'description', type: 'textarea' },
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
                  {tiposTransaccion.map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      className={formData.typeTransaction === value ? 'btn-selected' : 'btn-unselected'}
                      onClick={() => setFormData(prev => ({ ...prev, typeTransaction: value }))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-rowCP">
                <label>Forma de Pago:</label>
                <div className="button-group">
                  {formasPago.map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      className={formData.pay === value ? 'btn-selected' : 'btn-unselected'}
                      onClick={() => setFormData(prev => ({ ...prev, pay: value }))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="crear-accionesCP">
              <button className="aceptar-btnCP" onClick={handleSubmit}>
                Crear Transacción
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

export default CrearTransaccion;
