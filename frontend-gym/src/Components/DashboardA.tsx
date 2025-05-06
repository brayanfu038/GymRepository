// src/components/DashboardA.tsx
import React from "react";
import TopBar from "./TopBar";
import "./DashboardA.css";

const DashboardA: React.FC = () => {
  return (
    <div className="container">
      <TopBar /> {/* Barra superior */}
      <div className="content">
        {" "}
        {/* Contenido debajo de la barra */}
        <div className="leftMenu">
          <h1>Menú principal</h1>
          <button className="menu-btn">
            <i className="fa-solid fa-users"></i> Gestionar Membresías
          </button>
          <button className="menu-btn">
            <i className="fa-solid fa-calendar-check"></i> Gestionar Sesiones
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
      </div>
    </div>
  );
};

export default DashboardA;
