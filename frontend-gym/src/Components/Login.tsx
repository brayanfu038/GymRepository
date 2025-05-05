import React from 'react';
import './Login.css';

const Login: React.FC = () => {
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
    <form className='formulario' action="">
      <input className='input' type="text" placeholder='Usuario'/>
      <input className='input' type="password" placeholder='Contraseña' />
      <input className='input' id='sendLogin' type="submit" />
    </form>
  </div>
</div>
    
  );
};

export default Login;
