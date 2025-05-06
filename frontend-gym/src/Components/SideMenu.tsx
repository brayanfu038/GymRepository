import React from "react";
import "./SideMenu.css";

const SideMenu: React.FC = () => {
  return (
    <div className="leftMenu">
      <h1>Menú principal</h1>
      <button className="menu-btn">
        <i className="fa-solid fa-users"></i> Gestionar Membresías
      </button>
      <button className="menu-btn">
        <i className="fa-solid fa-calendar-check"></i> Gestionar Usuarios
      </button>
      <button className="menu-btn">
        <i className="fa-solid fa-boxes-stacked"></i> Gestionar Inventarios
      </button>
      <button className="menu-btn">
        <i className="fa-solid fa-chart-line"></i> Información Financiera
      </button>
      <button className="menu-btn">
        <i className="fa-solid fa-right-from-bracket"></i> Log Out
      </button>
    </div>
  );
};

export default SideMenu;
