import React , { useState } from 'react';
import './TopBar.css';
import SearchBar from './SearchBar';
import { FaBell } from 'react-icons/fa';

const TopBar: React.FC = () => {
  const [busqueda, setBusqueda] = useState<string>('');
  return (
    <div className="main">
      <span className="title">Ragnarok</span>

      <div className="right-section">
        <SearchBar width="350px" value={busqueda}
  onChange={setBusqueda}/>
<FaBell className="notification-icon" />        <span className="username">Usuario</span>
        <img className="profile-pic" src="../../public/img/pesas.jpeg" alt="Perfil" />
      </div>
    </div>
  );
};

export default TopBar;
