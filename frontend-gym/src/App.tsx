// import React from 'react';
<<<<<<< HEAD
// import Login from './Components/Login';
import DashboardA from './Components/DashboardA';
// import TopBar from './Components/TopBar';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
// src/index.tsx o src/App.tsx
// import 'font-awesome/css/font-awesome.min.css';  // Asegúrate de importar esto

import TopBar from './Components/TopBar';
import DashboardA from './Components/DashboardA';
>>>>>>> f99b667cf411bc59809aa75dddced8377edf1a76
// import NuevoUsuario from './Components/NuevoUsuario';

function App() {
  return (
<<<<<<< HEAD
    // <Login />
     <DashboardA></DashboardA>
      );
=======
    <Router>
      <Routes>
        <Route path = '/' element = {<Login />} />
        <Route path = '/dashboard' element = {<DashboardA />} />
      </Routes>
    </Router>

    //  <DashboardA></DashboardA>
    //<TopBar/> 
   );
>>>>>>> f99b667cf411bc59809aa75dddced8377edf1a76
}

export default App; 
