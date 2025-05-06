// src/components/DashboardA.tsx
import React from 'react';
import TopBar from './TopBar';
import './DashboardA.css';

const DashboardA: React.FC = () => {
  return (
    <div className="container">
      <TopBar />  {/* Barra superior */}
      <div className="content"> {/* Contenido debajo de la barra */}
       <div className='leftMenu'>
        <h1> Menú principal </h1>
       </div>
      </div>
    </div>
  );
};

export default DashboardA;
