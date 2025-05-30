export default class inventoryService {
    private static readonly BASE_URL = 'http://localhost:8080/api/inventario';
    
      // Obtener todas los productos
      static async getAll(): Promise<any> {
        const res = await fetch(this.BASE_URL);
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      }
}