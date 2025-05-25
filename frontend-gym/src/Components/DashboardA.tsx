// src/components/DashboardA.tsx
import React from "react";
import TopBar from "./TopBar";
import SideMenu from "./SideMenu";
import Card from "./Card";
import "./DashboardA.css";

const DashboardA: React.FC = () => {
  return (
    <div className="container">
      <TopBar />
      <div className="content">
        <SideMenu />
        <div className="mainArea">
          <Card
            title="Membresías"
            imageUrl="../../public/img/membresias.png"
            buttonText="Ir"
          />
          <Card
            title="Usuarios"
            imageUrl="../../public/img/membresias.png"
            buttonText="Ir"
          />
          <Card
            title="Inventario"
            imageUrl="../../public/img/membresias.png"
            buttonText="Ir"
          />
          <Card
            title="Finanzas"
            imageUrl="../../public/img/finanzas.png"
            buttonText="Ir"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardA;
