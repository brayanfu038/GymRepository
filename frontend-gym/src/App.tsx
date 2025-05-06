// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
// src/index.tsx o src/App.tsx
// import 'font-awesome/css/font-awesome.min.css';  // Asegúrate de importar esto

import TopBar from './Components/TopBar';
import DashboardA from './Components/DashboardA';
// import NuevoUsuario from './Components/NuevoUsuario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<Login />} />
        <Route path = '/dashboard' element = {<DashboardA />} />
      </Routes>
    </Router>

    //  <DashboardA></DashboardA>
    //<TopBar/> 
   );
}

export default App; 
