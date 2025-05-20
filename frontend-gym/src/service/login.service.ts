export default class Api {
    static async login(username: string, password: string): Promise<string> {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            let errorMessage = 'Error de autenticación';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (error) {
                errorMessage = await response.text() || errorMessage;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        const token = data.token;
        localStorage.setItem('jwtToken', token);
        return token;
    }

    static getAuthHeader(): Record<string, string> {
        const token = localStorage.getItem('jwtToken');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    static async fetchProtected<T>(path: string): Promise<T> {
        const headers = {
            'Content-Type': 'application/json',
            ...this.getAuthHeader()
        };

        const response = await fetch(`http://localhost:8080${path}`, { headers });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Error al obtener recurso protegido');
        }

        return response.json();
    }
}