import React, { useState } from 'react';
import './CrearProducto.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import MensajeFlotante from '../../generals/MensajeFlotante';
import { useNotificacionesUI } from '../../../hooks/useNotificacionesUI'; // IMPORTANTE

const CrearProducto: React.FC = () => {
  const navigate = useNavigate();

  const {
    mostrarMensaje,
    mensaje,
    mostrarExito
  } = useNotificacionesUI();

  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    proveedor: '',
    stockInicial: '',
    descripcion: '',
    fechaVencimiento: '',
    precioCompra: '',
    precioVenta: '',
    lote: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {


    // inventoryService.crearProducto(formData)
    // Aquí puedes agregar lógica de guardado (fetch, axios, etc.)
    mostrarExito('crear');
  };

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
          {/* Botón Volver */}
          <div>
            <button className="volver-btnCP" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Volver
            </button>
            <h2 className="titulo-crearCP">CREAR PRODUCTO</h2>
          </div>

          {/* Card Crear Producto */}
          <div className="crear-cardCProdu">
            {/* Botón Cerrar */}
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
              <button className="aceptar-btnCP" onClick={handleSubmit}>
                Crear Producto
              </button>
            </div>
          </div>
        </div>
      </div>

      <MensajeFlotante
        mensaje={mensaje}
        visible={mostrarMensaje}
        onCerrar={() => { }}
      />
    </div>
  );
};

export default CrearProducto;
