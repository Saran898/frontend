import React, { useState } from 'react';


function Header({ setIsAdding, handleRoleFilter }) {
  const [roleFilter, setRoleFilter] = useState('All');


  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
    handleRoleFilter(e.target.value);
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '-11px',
  };

  const selectContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '28%',
  };

  const selectLabelStyle = {
    marginRight: '8px',
    width:'72%',
  };

  return (
    <header >
      <h2>Role Management</h2>
      <div style={headerStyle}>
      <div>
        <button onClick={() => setIsAdding(true)} className='round-button'>Add Button</button>
      </div>
    
      <div style={selectContainerStyle}>
        <label htmlFor="roleFilter" style={selectLabelStyle}>Filter By Role:</label>
        <select id="roleFilter" value={roleFilter} onChange={handleRoleFilterChange}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      {/* Pagination component can be added here */}
      </div>
    </header>
  );
}

export default Header;
