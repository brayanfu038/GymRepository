import React from 'react';
import './DetallesProducto.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';

interface Producto {
  codigo: string;
  nombre: string;
  proveedor: string;
  stockInicial: number;
  descripcion: string;
  fechaVencimiento: string;
  precioCompra: string;
  precioVenta: string;
  lote: string;
}

interface DetallesProductoProps {
  producto: Producto;
}

const DetallesProducto: React.FC<DetallesProductoProps> = ({ producto }) => {
  const navigate = useNavigate();

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
            <div>
            <button className="volver-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Volver
            </button>
            </div>
          {/* Botón volver */}


          <div className="detalle-card">
            {/* Botón cerrar */}
            <button className="cerrar-btn" onClick={() => navigate(-1)}>
              <IoMdClose size={20} />
            </button>

            <h2 className="titulo-detalle">DETALLES DEL PRODUCTO</h2>

            <div className="detalle-contenido">
              <div className="columna-labels">
                <p>Código:</p>
                <p>Nombre:</p>
                <p>Proveedor:</p>
                <p>Stock Inicial:</p>
                <p>Descripción:</p>
                <p>Fecha de Vencimiento:</p>
                <p>Precio de Compra:</p>
                <p>Precio de Venta:</p>
                <p>Lote:</p>
              </div>
              <div className="columna-valores">
                <p>{producto.codigo}</p>
                <p>{producto.nombre}</p>
                <p>{producto.proveedor}</p>
                <p>{producto.stockInicial}</p>
                <p>{producto.descripcion}</p>
                <p>{producto.fechaVencimiento}</p>
                <p>{producto.precioCompra}</p>
                <p>{producto.precioVenta}</p>
                <p>{producto.lote}</p>
              </div>
            </div>

            <div className="detalle-acciones">
              <button className="aceptar-btn" onClick={() => navigate(-1)}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesProducto;
