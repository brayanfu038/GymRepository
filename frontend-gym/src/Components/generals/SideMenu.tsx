import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SideMenu.css";
import { FiUsers } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import { FaCalendarAlt, FaChartLine } from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";
import { LuUserCog } from "react-icons/lu";

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (ruta: string) => location.pathname === ruta;

  return (
    <div className="leftMenu">
      <div className="titulo">
        <h1>MENÚ PRINCIPAL</h1>
      </div>
      <button
        className={`menu-btn ${isActive('/membresias') ? 'active' : ''}`}
        onClick={() => navigate('/membresias')}
      >
        <FiUsers size={24} /> Gestionar Membresías
      </button>
      <button
        className={`menu-btn ${isActive('/usuarios') ? 'active' : ''}`}
        onClick={() => navigate('/usuarios')}
      >
        <FiUsers size={24} /> Gestionar Usuarios
      </button>
      <button
       className={`menu-btn ${isActive('/sesiones') ? 'active' : ''}`}
      onClick={() => navigate('/sesiones')}
      >
      <LuUserCog size={24} /> Gestionar sesiones
      </button>
      <button
        className={`menu-btn ${isActive('/inventario') ? 'active' : ''}`}
        onClick={() => navigate('/inventario')}
      >
        <MdOutlineInventory size={24} /> Gestionar Inventarios
      </button>
      <button
        className={`menu-btn ${isActive('/finanzas') ? 'active' : ''}`}
        onClick={() => navigate('/finanzas')}
      >
        <FaChartLine size={24} /> Información Financiera
      </button>
      <button
        className={`menu-btn ${isActive('/logout') ? 'active' : ''}`}
        onClick={() => navigate('/logout')}
      >
        <FaRightFromBracket size={24} /> Log Out
      </button>
    </div>
  );
};

export default SideMenu;
