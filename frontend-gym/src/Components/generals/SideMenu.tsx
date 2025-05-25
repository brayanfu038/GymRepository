import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideMenu.css";
import { FiUsers } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";




const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="leftMenu">
      <h1>Menú principal</h1>
      <button className="menu-btn" onClick={() => navigate('/membresias')}>
      <FiUsers size={24} /> Gestionar Membresías
      </button>
      <button className="menu-btn" onClick={() => navigate('/usuarios')}>
      <FaCalendarAlt size={24} /> Gestionar Usuarios
      </button>
      <button className="menu-btn" onClick={() => navigate('/Inventario')}>
      <MdOutlineInventory size={24} /> Gestionar Inventarios
      </button>
      <button className="menu-btn" onClick={() => navigate('/usuarios')}>
      <FaChartLine size={24} /> Información Financiera
      </button>
      <button className="menu-btn" onClick={() => navigate('/usuarios')}>
      <FaRightFromBracket size={24}/> Log Out
      </button>
    </div>
  );
};

export default SideMenu;
