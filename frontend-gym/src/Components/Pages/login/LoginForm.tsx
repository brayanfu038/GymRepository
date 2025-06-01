// src/Components/Pages/login/LoginForm.tsx
import React, { useState } from 'react';
import './Login.css';
import Api from '../../../service/login.service';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Api.login(usuario, contrasena);
      setError('');
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al intentar iniciar sesión');
      }
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0000' 
    }}>
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-left">
            <div className="overlay">
              <h1 >Ragnarok</h1>
              <h2>Lideramos el cambio,<br />forjamos campeones.</h2>
              <p>Domina la gestión con herramientas que impulsan tu éxito cada día</p>
            </div>
          </div>

          <div className="login-right">
            <h2>Bienvenido a Ragnarok Gym</h2>
            <p>Ingresa tus credenciales para continuar</p>

            <form className="formulario" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                required
              />
              <button type="submit">Iniciar sesión</button>
              {error && (
                <div className="error-box">
                  <span>⚠️</span>
                  <span>Usuario o contraseña son incorrectos</span>
                </div>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
