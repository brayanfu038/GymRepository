import React from 'react';
import './SearchBar.css';
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  width?: string;
  value: string;
  backgroundColor?: string;
  placeholder?: string; // <-- Se agregó esta línea
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  width = '250px',
  backgroundColor = 'white',
  value,
  onChange,
  placeholder = 'Buscar...', // <-- Valor por defecto
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSearch = () => {
    console.log('Buscando:', value);
  };

  return (
    <div className="search-container" style={{ width, backgroundColor }}>
      <input
        type="text"
        placeholder={placeholder} // <-- Ahora configurable
        value={value}
        onChange={handleChange}
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;