import React, { useState } from 'react';
import { Input } from 'reactstrap';
import '../styles/search-bar.css';


const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCriteriaChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCriteria((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((criteria) => criteria !== value);
      }
    });
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Llamar a la función onSearch con los criterios seleccionados, la consulta de búsqueda y el rango de fechas
    onSearch(selectedCriteria, searchQuery, startDate, endDate);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <form onSubmit={handleSearchSubmit}>

        <div>
            <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar..."
            />
            <button type="submit">Buscar</button>
        </div>
      
      
      <div>
        <label>
          <input
            type="checkbox"
            value="organizador"
            checked={selectedCriteria.includes('organizador')}
            onChange={handleCriteriaChange}
          />
          Organizador
        </label>
        <label>
          <input
            type="checkbox"
            value="ubicacion"
            checked={selectedCriteria.includes('ubicacion')}
            onChange={handleCriteriaChange}
          />
          Ubicación
        </label>
        <label>
          <input
            type="checkbox"
            value="categoria"
            checked={selectedCriteria.includes('categoria')}
            onChange={handleCriteriaChange}
          />
          Categoría
        </label>
        <label>
          <input
            type="checkbox"
            value="rangoFecha"
            checked={selectedCriteria.includes('rangoFecha')}
            onChange={(e) => {
              handleCriteriaChange(e);
              toggleDatePicker();
            }}
          />
          Rango de Fecha
        </label>
      </div>
      {showDatePicker && (
        <div>
          <label>
            Fecha de inicio:
            <Input
              type="date"
              id="event-start-date"
              value={startDate}
              onChange={handleStartDateChange}
              placeholder="Desde"
            />
          </label>
          <label>
            Fecha de fin:
            <Input
              type="date"
              id="event-end-date"
              value={endDate}
              onChange={handleEndDateChange}
              placeholder="Hasta"
            />
          </label>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
