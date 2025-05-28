export interface UserRequest {
  userName: string;
  password: string;
  email?: string;
  role: {
    roleType: 'ADMIN' | 'STAFF' | 'CLIENT';
    permissionList: string[];
  };

  // Campos heredados de Person
  names: string;
  lastNames: string;
  identificationNumber: number;
  typeId: string; // Ej: 'C.C', 'T.I', etc.
  dateBirth: string; // Formato ISO
  numberPhone: string;
}

export interface UserResponse {
  id: number;
  userName: string;
  email: string;
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

  static updateUser(id: number, user: UserRequest): Promise<UserResponse> {
    return Api.fetchProtected<UserResponse>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }

  static deactivateUser(id: number): Promise<void> {
    return Api.fetchProtected<void>(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }
}
