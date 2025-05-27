// src/components/DashboardS.tsx
import React from "react";
import TopBar from "../../generals/TopBar";
import SideMenu from "../../generals/SideMenu";
import Card from "../../generals/Card";
import "./DashboardS.css";

const DashboardS: React.FC = () => {
  return (
    <div className="container">
      <TopBar />
      <div className="content">
        <SideMenu />
        <div className="mainArea">
          <Card
            title="Membresías"
            imageUrl="/img/membresias.png"
            buttonText="Ir"
          />
          <Card
            title="Ventas"
            imageUrl="/img/finanzas.png"
            buttonText="Ir"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardS;
