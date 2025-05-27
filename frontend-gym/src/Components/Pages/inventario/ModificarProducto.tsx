import React, { useState } from 'react';
import './CrearProducto.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import AlertaConfirmacion from '../../generals/AlertaConfirmacion';
import MensajeFlotante from '../../generals/MensajeFlotante';
import { useNotificacionesUI } from '../../../hooks/useNotificacionesUI';  

const productoEjemplo = {
  codigo: 'PRD-001',
  nombre: 'Proteína Whey',
  proveedor: 'Proveedor A',
  stockInicial: '25',
  descripcion: 'Suplemento de proteína',
  fechaVencimiento: '2025-12-31',
  precioCompra: '30.00',
  precioVenta: '50.00',
  lote: 'L001',
};

const ModificarProducto: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    mostrarAlerta,
    setMostrarAlerta,
    mostrarMensaje,
    mensaje,
    tipoAccion,
    mostrarConfirmacion,
    confirmarAccion,
  } = useNotificacionesUI('modificar');

  const [formData, setFormData] = useState({ ...productoEjemplo });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModificarClick = () => {
    mostrarConfirmacion('modificar');
  };

  const handleEliminarClick = () => {
    mostrarConfirmacion('eliminar');
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
            <h2 className="titulo-crearCP">MODIFICAR PRODUCTO</h2>
          </div>

          <div className="crear-cardCP">
            <button className="cerrar-btnCP" onClick={() => navigate(-1)}>
              <IoMdClose size={20} />
            </button>

            <div className="crear-contenidoCP">
              {[
                { label: 'Código', name: 'codigo', type: 'text' },
                { label: 'Nombre', name: 'nombre', type: 'text' },
                { label: 'Proveedor', name: 'proveedor', type: 'text' },
                { label: 'Stock Inicial', name: 'stockInicial', type: 'number' },
                { label: 'Descripción', name: 'descripcion', type: 'textarea' },
                { label: 'Fecha de Vencimiento', name: 'fechaVencimiento', type: 'date' },
                { label: 'Precio de Compra', name: 'precioCompra', type: 'text' },
                { label: 'Precio de Venta', name: 'precioVenta', type: 'text' },
                { label: 'Lote', name: 'lote', type: 'text' },
              ].map((field) => (
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
            </div>

            <div className="crear-accionesCP">
              <button className="aceptar-btnCP" onClick={handleModificarClick}>
                Modificar Producto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta de Confirmación */}
      <AlertaConfirmacion
        mensaje={
          tipoAccion === 'modificar'
            ? '¿Seguro que deseas modificar este producto?'
            : '¿Seguro que deseas eliminar este producto?'
        }
        visible={mostrarAlerta}
        onCancelar={() => setMostrarAlerta(false)}
        onConfirmar={() => confirmarAccion()}
        tipo={'modificar' }
      />

      {/* Mensaje flotante de éxito */}
      <MensajeFlotante
        mensaje={mensaje}
        visible={mostrarMensaje}
        onCerrar={() => {
          // Esto se maneja automáticamente en el hook, pero por seguridad puedes ocultarlo manualmente
        }}
      />
    </div>
  );
};

export default ModificarProducto;
