// src/main.tsx (o index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Asegúrate de importar tu componente principal
import './index.css';  // Si tienes estilos globales

const root = ReactDOM.createRoot(document.getElementById('app')!);  // 'app' debe coincidir con el id en index.html
root.render(<App />);
