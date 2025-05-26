import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  width?: string;
  value: string;
  backgroundColor?:string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ width = '250px',  backgroundColor='white', value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSearch = () => {
    console.log('Buscando:', value);
  };

  return (
    <div className="search-container" style={{ width ,backgroundColor:backgroundColor}}>
      <input
        type="text"
        placeholder="Buscar..."
        value={value}
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
