export interface TransactionRequest {
  date: string; // formato ISO ej. "2025-06-03T14:00:00"
  value: number;
  description: string;
  typeTransaction: 'INGRESO' | 'EGRESO';
  pay: 'CASH' | 'CARD' | 'TRANSFER'; // ajusta si tus enums son otros
}

export interface TransactionResponse extends TransactionRequest {
  idTransaction: number;
}

export default class TransactionService {
  private static readonly BASE_URL = 'http://localhost:8080/api/transactions';

  // Obtener todas las transacciones
  static async getAll(): Promise<TransactionResponse[]> {
    const res = await fetch(this.BASE_URL);
    if (!res.ok) throw new Error('Error al obtener transacciones');
    return res.json();
  }

  // Obtener transacción por ID
  static async getById(idTransaction: number): Promise<TransactionResponse> {
    const res = await fetch(`${this.BASE_URL}/${idTransaction}`);
    if (!res.ok) throw new Error('Transacción no encontrada');
    return res.json();
  }

  // Crear nueva transacción
  static async create(transaction: TransactionRequest): Promise<TransactionResponse> {
    const res = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Error al crear transacción');
    }
    return res.json();
  }

  // Actualizar transacción existente
  static async update(idTransaction: number, transaction: TransactionRequest): Promise<void> {
    const res = await fetch(`${this.BASE_URL}/${idTransaction}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Error al actualizar transacción');
    }
  }

  // Eliminar transacción
  static async delete(idTransaction: number): Promise<void> {
    const res = await fetch(`${this.BASE_URL}/${idTransaction}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar transacción');
  }
}
