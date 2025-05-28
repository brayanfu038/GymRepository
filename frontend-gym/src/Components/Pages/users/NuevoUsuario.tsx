import React, { useState } from 'react';
import './NuevoUsuario.css';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import MensajeFlotante from '../../generals/MensajeFlotante';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import UserService from '../../../service/User.service';

enum TypeId {
  CC = 'CC',
  TI = 'TI',
  CE = 'CE',
}

const typeIdOptions = [
  { label: 'Cédula de ciudadanía', value: 'CC' },
  { label: 'Tarjeta de identidad', value: 'TI' },
  { label: 'Cédula de extranjería', value: 'CE' },
];

const roleOptions = [
  { label: 'Administrador', value: '1' },
  { label: 'Usuario', value: '2' }
];

const NuevoUsuario: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    names: '',
    lastNames: '',
    id: '',
    typeId: '',
    dateBirth: '',
    numberPhone: '',
    username: '',
    password: '',
    confirmarContrasena: '',
    roleId: '', // <- Nuevo campo obligatorio
  });

  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const {
      names, lastNames, id, typeId,
      dateBirth, numberPhone,
      username, password, confirmarContrasena, roleId
    } = formData;

    if (
      !names || !lastNames || !id ||
      !typeId || !dateBirth || !numberPhone ||
      !username || !password || !confirmarContrasena || !roleId
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const userData = {
        userName: username,
        password,
        email: `${numberPhone}@fake.com`,
        roleId: Number(roleId),
        names,
        lastNames,
        identificationNumber: Number(id),
        typeId,
        dateBirth,
        numberPhone,
      };

      await UserService.register(userData as any);
      alert('Usuario registrado con éxito');
      navigate(-1);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Ocurrió un error al registrar el usuario');
    }
  };

  return (
    <div className="containerM">
      <TopBar />
      <div className="contentM">
        <SideMenu />
        <div className="mainAreaM">
          <div>
            <button className="volver-btnCP" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Volver
            </button>
            <h2 className="titulo-crearCP">CREAR NUEVO USUARIO</h2>
          </div>
          <div className="crear-cardCPP">
            <button className="cerrar-btnCP" onClick={() => navigate(-1)}>
              <IoMdClose size={20} />
            </button>
            <div className="crear-contenidoCP">
              {[
                { label: 'Nombres', name: 'names', type: 'text' },
                { label: 'Apellidos', name: 'lastNames', type: 'text' },
                { label: 'Número de ID', name: 'id', type: 'text' },
                { label: 'Tipo de ID', name: 'typeId', type: 'select', options: typeIdOptions },
                { label: 'Fecha de Nac.', name: 'dateBirth', type: 'date' },
                { label: 'Teléfono', name: 'numberPhone', type: 'text' },
                { label: 'Usuario', name: 'username', type: 'text' },
                { label: 'Contraseña', name: 'password', type: 'password' },
                { label: 'Confirmar Contraseña', name: 'confirmarContrasena', type: 'password' },
                { label: 'Rol', name: 'roleId', type: 'select', options: roleOptions }
              ].map(field => (
                <div className="form-rowCP" key={field.name}>
                  <label htmlFor={field.name}>{field.label}:</label>
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      className="input"
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                    >
                      <option value="">-- Selecciona --</option>
                      {field.options!.map((opt: any) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      className="input"
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="crear-accionesCP">
              <button className="aceptar-btnCP" onClick={handleSubmit}>
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      </div>

      <MensajeFlotante
        mensaje={mensaje}
        visible={mostrarMensaje}
        onCerrar={() => {
          setMostrarMensaje(false);
          if (mensaje.includes('éxito')) navigate(-1);
        }}
      />
    </div>
  );
};

export default NuevoUsuario;
