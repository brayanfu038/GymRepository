export default class Api {
  static async login(username: string, password: string): Promise<string> {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      }); 

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        throw new Error(errorData.message || 'Error de autenticación');
      }

      const data = await response.json();
      localStorage.setItem('jwtToken', data.token);
      return data.token;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error("Respuesta inválida del servidor");
      }
      throw error;
    }
  }

  static async fetchProtected<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await fetch(`http://localhost:8080${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(options.headers || {})
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
      throw new Error("Sesión expirada");
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error("Error en solicitud protegida:", error);
    throw error;
  }
} 

}
