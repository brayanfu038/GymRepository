export default class inventoryService {
  private static readonly BASE_URL = 'http://localhost:8080/api/inventario';

  // Obtener todas los productos
  static async getAll(): Promise<any> {
    const res = await fetch(this.BASE_URL);
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
  }

  // Crear un nuevo producto
  static async createProduct(producto: any): Promise<any> {
    const res = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });

    if (!res.ok) throw new Error('Error al crear el producto');
    return res.json();
  }

  // Editar un producto existente
  static async updateProduct(id: number, updatedProduct: any): Promise<any> {
    const url = `${this.BASE_URL}/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) throw new Error('Error al actualizar el producto');
    return res.json();
  }

   // Eliminar un producto por ID
  static async deleteProduct(id: number): Promise<void> {
    const url = `${this.BASE_URL}/${id}`;
    const res = await fetch(url, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Error al eliminar el producto');
  }
}