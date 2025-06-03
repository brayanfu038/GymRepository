import React from 'react';
import './DetallesProducto.css';
import { IoMdClose } from 'react-icons/io';

interface Producto {
  id: number;
  name: string;
  description: string;
  productType: string;
  purchasePrice: number;
  salePrice: number;
  // EDIBLE
  batch?: string;
  expirationDate?: string;
  // CLOTHING
  color?: string;
  material?: string;
  size?: string;
  style?: string;
}

interface DetallesProductoModalProps {
  producto: Producto;
  onClose: () => void;
}

const DetallesProductoModal: React.FC<DetallesProductoModalProps> = ({ producto, onClose }) => {
  return (
    <div className="modal-overlayDP">
      <div className="detalle-cardDP">
        <button className="cerrar-btnDP" onClick={onClose}>
          <IoMdClose size={20} />
        </button>

        <h2 className="titulo-detalleDP">DETALLES DEL PRODUCTO</h2>

        <div className="detalle-contenidoDP">
          <div className="columna-labelsDP">
            <p>ID:</p>
            <p>Nombre:</p>
            <p>Descripción:</p>
            <p>Precio Compra:</p>
            <p>Precio Venta:</p>
            <p>Tipo:</p>

            {producto.productType === 'EDIBLE' && (
              <>
                <p>Lote:</p>
                <p>Fecha de Vencimiento:</p>
              </>
            )}

            {producto.productType === 'CLOTHING' && (
              <>
                <p>Color:</p>
                <p>Material:</p>
                <p>Tamaño:</p>
                <p>Estilo:</p>
              </>
            )}
          </div>

          <div className="columna-valoresDP">
            <p>{producto.id}</p>
            <p>{producto.name}</p>
            <p>{producto.description}</p>
            <p>${producto.purchasePrice}</p>
            <p>${producto.salePrice}</p>
            <p>{producto.productType}</p>

            {producto.productType === 'EDIBLE' && (
              <>
                <p>{producto.batch}</p>
                <p>{producto.expirationDate}</p>
              </>
            )}

            {producto.productType === 'CLOTHING' && (
              <>
                <p>{producto.color}</p>
                <p>{producto.material}</p>
                <p>{producto.size}</p>
                <p>{producto.style}</p>
              </>
            )}
          </div>
        </div>

        <div className="detalle-accionesDP">
          <button className="aceptar-btnDP" onClick={onClose}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default DetallesProductoModal;