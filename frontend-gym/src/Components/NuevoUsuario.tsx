//import React, { useState } from 'react';
import { useState } from 'react'; 
import './NuevoUsuario.css';

enum TypeId {
  CC = 'Cédula de ciudadanía',
  TI = 'Tarjeta de identidad',
  PASAPORTE = 'Pasaporte',
}

const NuevoUsuario: React.FC = () => {
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [id, setId] = useState(0);
  const [typeId, setTypeId] = useState<TypeId>(TypeId.CC);
  const [dateBirth, setDateBirth] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!names || !lastNames || !id || !typeId || !dateBirth || !numberPhone || !username || !password || !confirmarContrasena) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmarContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setSuccess('Usuario creado con éxito!');
    setError('');
  };

  return (
    <div className='main'>
      <div className='menuLateral'>
        <h1 className='tituloMenu'>Ragnarok</h1>
        <ul className='menuList'>
          <li>Inicio</li>
          <li>Usuarios</li>
          <li>Configuración</li>
          <li>Salir</li>
        </ul>
      </div>

      <div className='divRight'>
        <h3>Crear nuevo usuario</h3>
        <form className='formulario' onSubmit={handleSubmit}>
          <input className='input' type="text" placeholder='Nombres' value={names} onChange={(e) => setNames(e.target.value)} />
          <input className='input' type="text" placeholder='Apellidos' value={lastNames} onChange={(e) => setLastNames(e.target.value)} />
          <input className='input' type="number" placeholder='Número de identificación' value={id} onChange={(e) => setId(Number(e.target.value))} />
          <select className='input' value={typeId} onChange={(e) => setTypeId(e.target.value as TypeId)}>
            <option value={TypeId.CC}>Cédula de ciudadanía</option>
            <option value={TypeId.TI}>Tarjeta de identidad</option>
            <option value={TypeId.PASAPORTE}>Pasaporte</option>
          </select>
          <input className='input' type="date" value={dateBirth} onChange={(e) => setDateBirth(e.target.value)} />
          <input className='input' type="text" placeholder='Número de teléfono' value={numberPhone} onChange={(e) => setNumberPhone(e.target.value)} />
          <input className='input' type="text" placeholder='Nombre de usuario' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className='input' type="password" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className='input' type="password" placeholder='Confirmar contraseña' value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} />
          <input className='input' id='sendRegister' type="submit" value="Crear cuenta" />
          
          {error && <div className="error-box">⚠️ {error}</div>}
          {success && <div className="success-box">✅ {success}</div>}
        </form>
      </div>
    </div>
  );
};

export default NuevoUsuario;
