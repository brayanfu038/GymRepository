// src/service/Person.service.ts
export interface PersonRequest {
  names: string;
  lastNames: string;
  identificationNumber: number;
  typeId: string; // Ej: "CC", "TI", etc.
  dateBirth: string; // Formato ISO, ej: "2000-01-01"
  numberPhone: string;
}

export interface PersonResponse extends PersonRequest {
  // Puedes añadir campos adicionales que el backend agregue, si existen
}

export default class PersonService {
  private static readonly BASE_URL = 'http://localhost:8080/api/personas';

  // Obtener todas las personas
  static async getAll(): Promise<PersonResponse[]> {
    const res = await fetch(this.BASE_URL);
    if (!res.ok) throw new Error('Error al obtener personas');
    return res.json();
  }

  // Obtener persona por número de identificación
  static async getById(identificationNumber: number): Promise<PersonResponse> {
    const res = await fetch(`${this.BASE_URL}/${identificationNumber}`);
    if (!res.ok) throw new Error('Persona no encontrada');
    return res.json();
  }

  // Crear nueva persona
  static async create(person: PersonRequest): Promise<void> {
    const res = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Error al crear persona');
    }
  }

  // Actualizar persona existente
  static async update(identificationNumber: number, person: PersonRequest): Promise<void> {
    const res = await fetch(`${this.BASE_URL}/${identificationNumber}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Error al actualizar persona');
    }
  }

  // Eliminar persona
  static async delete(identificationNumber: number): Promise<void> {
    const res = await fetch(`${this.BASE_URL}/${identificationNumber}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar persona');
  }
}
