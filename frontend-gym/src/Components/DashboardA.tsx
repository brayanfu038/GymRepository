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
          <h1> Menú principal </h1>
          <button className="menu-btn">Inicio</button>
          <button className="menu-btn">Perfil</button>
          <button className="menu-btn">Mensajes</button>
          <button className="menu-btn">Configuración</button>
          <button className="menu-btn">Ayuda</button>
          <button className="menu-btn">Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardA;
