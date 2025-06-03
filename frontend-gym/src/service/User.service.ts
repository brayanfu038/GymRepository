export interface UserRequest {
  userName: string;
  password: string;
  email?: string;
  roleId: number; // ID del rol, se puede mapear a RoleType

  // Campos heredados de Person
  identificationNumber: number;
  names: string;
  lastNames: string;
  typeId: string; // Ej: 'C.C', 'T.I', etc.
  dateBirth: string; // Formato ISO
  numberPhone: string;
  active: boolean;
}

export interface UserResponse {
  id: number;
  userName: string;
  password: string;
  active: boolean;
  typeId: string;
  role: {
    roleType: 'ADMIN' | 'STAFF' | 'CLIENT';
    permissionList: string[];
  };
}

export enum RoleType {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CLIENT = 'CLIENT',
}

import Api from './login.service';

export default class UserService {
  private static readonly BASE_URL = 'http://localhost:8080/api/users';

  static async register(user: UserRequest): Promise<UserResponse> {
    const response = await fetch(`${this.BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const err = await response.json();
      alert(err.message || 'Error al registrar usuario');
      throw new Error(err.message || 'Error al registrar usuario');
    }
    return response.json();
  }

  static getUserById(id: number): Promise<UserResponse> {
    return Api.fetchProtected<UserResponse>(`/api/users/${id}`);
  }

  static getAllUsers(): Promise<UserResponse[]> {
    return Api.fetchProtected<UserResponse[]>('/api/users/allU');
  }

  static async updateUser(id: number, user: UserRequest): Promise<UserResponse> {

    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const err = await response.json();
      alert(err.message || 'Error al actualizar usuario');
      throw new Error(err.message || 'Error al actualizar usuario');
    }

    return response.json();

  }

  static deactivateUser(id: number): Promise<void> {
    return Api.fetchProtected<void>(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }
}
