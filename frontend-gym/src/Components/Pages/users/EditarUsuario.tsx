import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import SideMenu from '../../generals/SideMenu';
import TopBar from '../../generals/TopBar';
import MensajeFlotante from '../../generals/MensajeFlotante';
import { useNotificacionesUI } from '../../../hooks/useNotificacionesUI';
import './EditarUsuario.css';

enum TypeId {
    CC = 'Cédula de ciudadanía',
    TI = 'Tarjeta de identidad',
    CE = 'Cédula de extranjería',
}

enum RoleType {
    ADMIN = 'Administrador',
    STAFF = 'Staff',
}

interface Usuario {
    id: number;
    identificationNumber: number;
    names: string;
    lastNames: string;
    typeId: keyof typeof TypeId;
    dateBirth: string;
    numberPhone: string;
    userName: string;
    password: string;
    confirmarContrasena: string;
    roleId: number;
    active: boolean;
}

const EditarUsuario: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const usuarioEditar: Usuario = location.state?.usuario;

    const {
        setMostrarAlerta,
        mostrarConfirmacion: mostrarConfirm,
        confirmarAccion,
        mensaje,
        mostrarMensaje
    } = useNotificacionesUI('modificar');

    const [formData, setFormData] = useState<Usuario>({
        id: 0,
        identificationNumber: 0,
        names: '',
        lastNames: '',
        typeId: 'CC',
        dateBirth: '',
        numberPhone: '',
        userName: '',
        password: '',
        confirmarContrasena: '',
        roleId: 0,
        active: true,
    });

    useEffect(() => {
        if (usuarioEditar) {
            setFormData({ ...usuarioEditar, password: '', confirmarContrasena: '' });
        }
    }, [usuarioEditar]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'identificationNumber' || name === 'roleId' ? Number(value) : value,
        }));
    };

    const onConfirmar = () => {
        const {
            names, lastNames, identificationNumber, typeId,
            dateBirth, numberPhone, userName,
            password, confirmarContrasena, roleId
        } = formData;

        if (
            !names || !lastNames || !identificationNumber ||
            !typeId || !dateBirth || !numberPhone ||
            !userName || roleId <= 0 ||
            (password && password !== confirmarContrasena)
        ) {
            setMostrarAlerta(true);
            mostrarConfirm('modificar');
            return;
        }

        confirmarAccion();
    };

    return (
        <div className="containerM">
            <TopBar />
            <div className="contentM">
                <SideMenu />
                <div className="mainAreaM">
                    <div className="header-section">
                        <button className="volver-btnCP" onClick={() => navigate(-1)}>
                            <FaArrowLeft /> Volver
                        </button>
                        <h2 className="titulo-crearCP">EDITAR USUARIO</h2>
                    </div>

                    <div className="crear-cardCPP">
                        <h3 className="form-subtitle">Información Personal</h3>
                        <button className="cerrar-btnCP" onClick={() => navigate(-1)}>
                            <IoMdClose size={20} />
                        </button>

                        <div className="form-container">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="names">Nombres</label>
                                    <input type="text" id="names" name="names" value={formData.names} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastNames">Apellidos</label>
                                    <input type="text" id="lastNames" name="lastNames" value={formData.lastNames} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="typeId">Tipo de ID</label>
                                    <select id="typeId" name="typeId" value={formData.typeId} onChange={handleChange}>
                                        <option value="">-- Selecciona --</option>
                                        {Object.entries(TypeId).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="identificationNumber">Número de ID</label>
                                    <input type="number" id="identificationNumber" name="identificationNumber" value={formData.identificationNumber} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateBirth">Fecha de Nacimiento</label>
                                    <input type="date" id="dateBirth" name="dateBirth" value={formData.dateBirth} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numberPhone">Teléfono</label>
                                    <input type="tel" id="numberPhone" name="numberPhone" value={formData.numberPhone} onChange={handleChange} />
                                </div>
                            </div>

                            <h3 className="form-subtitle">Información de Cuenta</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="userName">Usuario</label>
                                    <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Nueva Contraseña</label>
                                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
                                    <input type="password" id="confirmarContrasena" name="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="roleId">Rol</label>

                                    <select id="roleId" name="roleId" value={formData.roleId} onChange={handleChange}>
                                        <option value={0}>-- Selecciona --</option>
                                        {Object.entries(RoleType).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="crear-accionesCP">
                            <button className="aceptar-btnCP" onClick={onConfirmar}>
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <MensajeFlotante
                mensaje={mensaje}
                visible={mostrarMensaje}
                onCerrar={() => navigate(-1)}
            />
        </div>
    );
}
export default EditarUsuario;