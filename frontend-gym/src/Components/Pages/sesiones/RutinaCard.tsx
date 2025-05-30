// src/components/RutinaCard.tsx
import React from "react";
import "./RutinaCard.css";

interface RutinaCardProps {
  nombre: string;
  dias: string[];
}

const RutinaCard: React.FC<RutinaCardProps> = ({ nombre, dias }) => {
  return (
    <div className="rutina-card">
      <h3>{nombre}</h3>
      <ul>
        {dias.map((dia, index) => (
          <li key={index}>{dia}</li>
        ))}
      </ul>
    </div>
  );
};

export default RutinaCard;
