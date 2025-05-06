class Api {
    static async login(username:string, password:string) {
        console.log('xdxddxdddxd')
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
      } catch (error) {
        console.error('Error de red:', error);
        throw error;
      }
    }
  }
  
  export default Api;
