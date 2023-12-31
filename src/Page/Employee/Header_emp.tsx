import React, { useState, useEffect, ChangeEvent } from 'react';
// import searchIcon from '../../images/searchicon.png';

import axios from 'axios';

interface Employee {
  // Define your Employee interface here
  emp_id: number;
  firstname: string;
  lastname: string;
  // ... Other properties ...
}

interface Props {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  filterBySearch: (searchQuery: string) => void;
  setFilteredUsers: React.Dispatch<React.SetStateAction<Employee[]>>;
}

function Header({ setIsAdding, filterBySearch, setFilteredUsers }: Props) {
  const [searchInput, setSearchInput] = useState<string>('');
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    filterBySearch(e.target.value);
  };

  // Rest of the code remains the same...
  useEffect(() => {
    // Fetch employees from the backend API using axios
    axios
      .get('http://192.168.11.150:4000/employees') // Replace this with your actual backend route
      .then((response) => response.data)
      .then((data: Employee[]) => {
        setFilteredUsers(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [setFilteredUsers]);

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '-11px',
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

  return (
    <header>
      <h1>Employee Management</h1>
      <div style={headerStyle}>
        <div>
          <button onClick={() => setIsAdding(true)} className='round-button' title='Add Employee'>
            Add Button
          </button>
        </div>
        <div style={searchContainerStyle}>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search by role name..."
            style={searchInputStyle}
          />
          {/* <img src={searchIcon} alt="Search" style={searchIconStyle} /> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
