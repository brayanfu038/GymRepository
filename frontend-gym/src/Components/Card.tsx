// src/components/Card.tsx
import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  imageUrl: string;
  buttonText: string;
}

const Card: React.FC<CardProps> = ({ title, imageUrl, buttonText }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} className="card-image" />
      <button className="card-button">{buttonText}</button>
    </div>
  );
};

export default Card;
