import React, { useState } from 'react';
import './NuevoUsuario.css';  // Reutiliza tu CSS existente
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import AlertaConfirmacion from '../../generals/AlertaConfirmacion';
import MensajeFlotante from '../../generals/MensajeFlotante';
import { useNotificacionesUI } from '../../../hooks/useNotificacionesUI';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import UserService  from '../../../service/User.service';
import PersonService, { PersonRequest } from '../../../service/Person.service';


enum TypeId {
  CC = 'Cédula de ciudadanía',
  TI = 'Tarjeta de identidad',
  PASAPORTE = 'Pasaporte',
}

const api = new UserService();

const NuevoUsuario: React.FC = () => {
  const navigate = useNavigate();
  const {
    mostrarAlerta,
    setMostrarAlerta,
    mostrarConfirmacion,
    confirmarAccion,
    mensaje,
    mostrarMensaje
  } = useNotificacionesUI('crear');

  const [formData, setFormData] = useState({
    names: '',
    lastNames: '',
    id: '',
    typeId: '' as TypeId | '',
    dateBirth: '',
    numberPhone: '',
    username: '',
    password: '',
    confirmarContrasena: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  const {
    names, lastNames, id, typeId,
    dateBirth, numberPhone,
    username, password, confirmarContrasena
  } = formData;

  if (
    !names || !lastNames || !id ||
    !typeId || !dateBirth || !numberPhone ||
    !username || !password || !confirmarContrasena
  ) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (password !== confirmarContrasena) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  try {
    // Registrar usuario
    const userData = {
      username,
      password,
      email: `${numberPhone}@fake.com`
    };
    await UserService.register(userData);

    // Registrar persona
    const personData: PersonRequest = {
      names,
      lastNames,
      identificationNumber: Number(id),
      typeId,
      dateBirth,
      numberPhone,
    };
    await PersonService.create(personData);

    alert('Usuario y persona registrados con éxito');
    navigate(-1);
  } catch (error) {
    console.error('Error al registrar:', error);
    alert('Ocurrió un error al registrar el usuario o la persona');
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
                { label: 'Tipo de ID', name: 'typeId', type: 'select', options: Object.values(TypeId) },
                { label: 'Fecha de Nac.', name: 'dateBirth', type: 'date' },
                { label: 'Teléfono', name: 'numberPhone', type: 'text' },
                { label: 'Usuario', name: 'username', type: 'text' },
                { label: 'Contraseña', name: 'password', type: 'password' },
                { label: 'Confirmar Contraseña', name: 'confirmarContrasena', type: 'password' },
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
                      {field.options!.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
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

      {/* Mensaje flotante */}
      <MensajeFlotante
        mensaje={mensaje}
        visible={mostrarMensaje}
        onCerrar={() => navigate(-1)}
      />
    </div>
  );
};

export default NuevoUsuario;
