import React, { useState } from 'react';
import './Login.css';
import Api from '../service/login.service';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => { 
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

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
        <div className='main'>
            <div className='divLeft'>{/* ... */}</div>
            <div className='divRight'>
                <form className='formulario' onSubmit={handleSubmit}>
                    <input
                        className='input'
                        type='text'
                        placeholder='Usuario'
                        value={usuario}
                        onChange={e => setUsuario(e.target.value)}
                        required
                    />
                    <input
                        className='input'
                        type='password'
                        placeholder='Contraseña'
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                        required
                    />
                    <button className='input' id='sendLogin' type='submit'>Enviar</button>
                    {error && (
                        <div className='error-box'>
                            <span className='error-icon'>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;