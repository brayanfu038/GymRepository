import React, { useState } from 'react';
import './CrearProducto.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import MensajeFlotante from '../../generals/MensajeFlotante';
import { useNotificacionesUI } from '../../../hooks/useNotificacionesUI'; // IMPORTANTE
import inventoryService from '../../../service/inventory.service';

const CrearProducto: React.FC = () => {
  const navigate = useNavigate();

  const {
    mostrarMensaje,
    mensaje,
    mostrarExito
  } = useNotificacionesUI();

  const [formData, setFormData] = useState({
    productType: '',
    nombre: '',
    proveedor: '',
    stockInicial: 0,
    descripcion: '',
    precioCompra: '',
    precioVenta: '',
    lote: '',
    fechaVencimiento: '',
    color: '',
    material: '',
    size: '',
    style: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    let producto: any = {
      productType: formData.productType,
      name: formData.nombre,
      description: formData.descripcion,
      purchasePrice: parseFloat(formData.precioCompra),
      salePrice: parseFloat(formData.precioVenta),
    };

    if (formData.productType === 'EDIBLE') {
      producto = {
        ...producto,
        batch: formData.lote,
        expirationDate: formData.fechaVencimiento,
      };
    }

    if (formData.productType === 'CLOTHING') {
      producto = {
        ...producto,
        color: formData.color,
        material: formData.material,
        size: formData.size,
        style: formData.style,
      };
    }
    console.log('Enviado al backend:', producto);
    try {
      const result = await inventoryService.createProduct(producto);
      console.log('Producto creado:', result);
      confirmarAccion();
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
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
                { label: 'Tipo de Producto (EDIBLE - CLOTHING)', name: 'productType', type: 'select' },
                { label: 'Nombre', name: 'nombre', type: 'text' },
                { label: 'Proveedor', name: 'proveedor', type: 'text' },
                { label: 'Stock Inicial', name: 'stockInicial', type: 'number' },
                { label: 'Descripción', name: 'descripcion', type: 'textarea' },
                { label: 'Precio de Compra', name: 'precioCompra', type: 'text' },
                { label: 'Precio de Venta', name: 'precioVenta', type: 'text' },
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
                  ) : field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                    >
                      <option value="">-- Selecciona un tipo --</option>
                      <option value="EDIBLE">EDIBLE</option>
                      <option value="CLOTHING">CLOTHING</option>
                    </select>
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

              {/* Campos específicos de EDIBLE */}
              {formData.productType === 'EDIBLE' && (
                <>
                  <div className="form-rowCP">
                    <label htmlFor="lote">Lote:</label>
                    <input
                      type="text"
                      id="lote"
                      name="lote"
                      value={formData.lote}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-rowCP">
                    <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
                    <input
                      type="date"
                      id="fechaVencimiento"
                      name="fechaVencimiento"
                      value={formData.fechaVencimiento}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Campos específicos de CLOTHING */}
              {formData.productType === 'CLOTHING' && (
                <>
                  <div className="form-rowCP">
                    <label htmlFor="color">Color:</label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-rowCP">
                    <label htmlFor="material">Material:</label>
                    <input
                      type="text"
                      id="material"
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-rowCP">
                    <label htmlFor="size">Tamaño:</label>
                    <input
                      type="text"
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-rowCP">
                    <label htmlFor="style">Estilo:</label>
                    <input
                      type="text"
                      id="style"
                      name="style"
                      value={formData.style}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
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
