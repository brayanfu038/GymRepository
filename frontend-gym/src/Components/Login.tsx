import React, { useState } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Datos de prueba
    const userTest = 'admin';
    const passTest = '1234';

    if (usuario === userTest && contrasena === passTest) {
      setError('');
      alert('¡Inicio de sesión exitoso!'); // simulación de éxito
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className='main'>
      <div className='divLeft'>
        <div className='divContLeft'>
          <h1>Ragnarok</h1>
          <h2>Lideramos el cambio, forjamos campeones.</h2>
          <p className='text'>Domina la gestión con herramientas que impulsan tu éxito cada día</p>
        </div>
      </div>
      <div className='divRight'>
        <h3>Bienvenido a Ragnarok Gym</h3>
        <p className='txt'>Ingresa tus credenciales para continuar</p>
        <form className='formulario' onSubmit={handleSubmit}>
          <input
            className='input'
            type="text"
            placeholder='Usuario'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            className='input'
            type="password"
            placeholder='Contraseña'
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <input className='input' id='sendLogin' type="submit" value="Enviar" />
          {error && (
  <div className="error-box">
    <span className="error-icon">⚠️</span>
    <span>{error}</span>
  </div>
)}

        </form>
      </div>
    </div>
  );
};

export default Login;
