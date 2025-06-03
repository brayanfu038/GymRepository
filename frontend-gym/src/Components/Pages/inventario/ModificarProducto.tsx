import React, { useState, useEffect } from 'react';
import './ModificarProductoPopup.css'; // Puedes ajustar estilos para modal

type ProductType = 'EDIBLE' | 'CLOTHING';

interface BaseProduct {
  productType: ProductType;
  name: string;
  purchasePrice: number;
  salePrice: number;
  description: string;
}

interface EdibleProduct extends BaseProduct {
  productType: 'EDIBLE';
  batch: string;
  expirationDate: string; // ISO date string
}

interface ClothingProduct extends BaseProduct {
  productType: 'CLOTHING';
  size: string;
  color: string;
  material: string;
  style: string;
}

type Product = EdibleProduct | ClothingProduct;

interface ModificarProductoPopupProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const ModificarProductoPopup: React.FC<ModificarProductoPopupProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Product>(product);

  // Si el prop cambia, sincronizar estado local
  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Para campos numéricos convertimos a number
    const valueFinal =
      name === 'purchasePrice' || name === 'salePrice'
        ? parseFloat(value) || 0
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: valueFinal,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modificar Producto</h2>
        <button className="modal-close-btn" onClick={onClose}>
          X
        </button>

        {/* Campos comunes */}
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Precio Compra:
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            step="0.01"
          />
        </label>

        <label>
          Precio Venta:
          <input
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            step="0.01"
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        {/* Campos específicos */}
        {formData.productType === 'EDIBLE' && (
          <>
            <label>
              Lote:
              <input
                type="text"
                name="batch"
                value={(formData as EdibleProduct).batch}
                onChange={handleChange}
              />
            </label>
            <label>
              Fecha de Expiración:
              <input
                type="date"
                name="expirationDate"
                value={(formData as EdibleProduct).expirationDate}
                onChange={handleChange}
              />
            </label>
          </>
        )}

        {formData.productType === 'CLOTHING' && (
          <>
            <label>
              Tamaño:
              <input
                type="text"
                name="size"
                value={(formData as ClothingProduct).size}
                onChange={handleChange}
              />
            </label>
            <label>
              Color:
              <input
                type="text"
                name="color"
                value={(formData as ClothingProduct).color}
                onChange={handleChange}
              />
            </label>
            <label>
              Material:
              <input
                type="text"
                name="material"
                value={(formData as ClothingProduct).material}
                onChange={handleChange}
              />
            </label>
            <label>
              Estilo:
              <input
                type="text"
                name="style"
                value={(formData as ClothingProduct).style}
                onChange={handleChange}
              />
            </label>
          </>
        )}

        <div className="modal-actions">
          <button onClick={handleSave}>Guardar Cambios</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModificarProductoPopup;