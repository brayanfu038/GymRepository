import React, { useState } from 'react';
import './Login.css';
import Api from '../service/login.service';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const data = await Api.login(usuario, contrasena);
      setError('');
      alert('¡Inicio de sesión exitoso!');
      navigate('/dashboard');
      console.log('Respuesta del backend:', data);
    } catch (error) {
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
