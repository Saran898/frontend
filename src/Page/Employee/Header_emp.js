import React, { useState } from 'react';
import searchIcon from '../../images/searchicon.png';

function Header({ setIsAdding, handleSearch, handleManagerFilter, handleRoleFilter }) {
  const [searchInput, setSearchInput] = useState('');
  const [managerFilter, setManagerFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    handleSearch(e.target.value);
  };

  const handleManagerFilterChange = (e) => {
    setManagerFilter(e.target.value);
    handleManagerFilter(e.target.value);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
    handleRoleFilter(e.target.value);
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '18px',
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    padding: '4px',
  };

  const searchInputStyle = {
    border: 'none',
    background: 'none',
    flex: '1',
    padding: '8px',
    fontSize: '16px',
  };

  const searchIconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };

  const selectContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const selectLabelStyle = {
    marginRight: '8px',
  };

  return (
    <header >
      <h1>Employee Management</h1>
      <div style={headerStyle}>
      <div>
        <button onClick={() => setIsAdding(true)} className='round-button'>Add Button</button>
      </div>
      <div style={searchContainerStyle}>
        <input type="text" value={searchInput} onChange={handleSearchInputChange} placeholder="Search by name..." style={searchInputStyle} />
        <img src={searchIcon} alt="Search" style={searchIconStyle} />

      </div>
      <div style={selectContainerStyle}>
        <label htmlFor="managerFilter" style={selectLabelStyle}>Filter By Manager:</label>
        <select id="managerFilter" value={managerFilter} onChange={handleManagerFilterChange}>
          <option value="All">All</option>
          <option value="Manager 1">Manager 1</option>
          <option value="Manager 2">Manager 2</option>
          <option value="Manager 3">Manager 3</option>
        </select>
      </div>
    
      {/* Pagination component can be added here */}
      </div>
    </header>
  );
}

export default Header;
