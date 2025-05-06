import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log('Buscando:', query);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>
      <i className="fa-solid fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
