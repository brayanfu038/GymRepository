import React from 'react';
import './TopBar.css';
import SearchBar from './SearchBar';

const TopBar: React.FC = () => {
  return (
    <div className="main">
      <h1>Ragnarok</h1>

      <div className="right-section">
        <SearchBar width="350px"/>
        <i className="fa-solid fa-bell notification-icon"></i>
        <span className="username">Usuario</span>
        <img className="profile-pic" src="../../public/img/pesas.jpeg" alt="Perfil" />
      </div>
    </div>
  );
};

export default TopBar;
