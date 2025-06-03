import Api from './login.service'; // Suponiendo que maneja autenticación


export interface InventoryRequest {
  id: number;
  productType: 'EDIBLE' | 'CLOTHING' | 'EQUIPMENT' | 'ACCESSORY';
  description: string;
  name: string;
  purchase_price: number;
  sale_price: number;
  color: string;
  material: string;
  size: string;
  style: string;
  batch: string;
  expirationdate: string; // formato ISO (YYYY-MM-DD)
}

export interface InventoryResponse extends InventoryRequest {
  id: number;
}

export default class InventoryService {
  private static readonly BASE_URL = 'http://localhost:8080/api/inventario';

  static async register(item: InventoryRequest): Promise<InventoryResponse> {
    const response = await fetch(`${this.BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const err = await response.json();
      alert(err.message || 'Error al registrar el producto');
      throw new Error(err.message || 'Error al registrar el producto');
    }

    return response.json();
  }

  static getAll(): Promise<InventoryResponse[]> {
    return Api.fetchProtected<InventoryResponse[]>('/api/inventario/allInventory');
  }

  static getById(id: number): Promise<InventoryResponse> {
    return Api.fetchProtected<InventoryResponse>(`${this.BASE_URL}/${id}`);
  }

  static async update(id: number, item: InventoryRequest): Promise<InventoryResponse> {
    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const err = await response.json();
      alert(err.message || 'Error al actualizar el producto');
      throw new Error(err.message || 'Error al actualizar el producto');
    }

    return response.json();
  }

  static delete(id: number): Promise<void> {
    return Api.fetchProtected<void>(`${this.BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  }
}
