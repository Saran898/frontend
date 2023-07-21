import React, { useState, useEffect } from 'react';
import Pagination from './Pagination.js';

function List({ handleUpdate,roleFilter }) {
  const [employees, setEmployees] = useState([]);
  const [activeStatus, setActiveStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to display per page

  const handleToggle = (id) => {
    setActiveStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
  };

  useEffect(() => {
    fetch('http://192.168.11.150:4000/roles')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        // Set the activeStatus based on the data
        const initialActiveStatus = {};
        data.forEach((employee) => {
          initialActiveStatus[employee.role_id] = employee.is_active_flag;
        });
        setActiveStatus(initialActiveStatus);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
 

// Get the current page's data
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

// Change page
const onPageChange = (pageNumber) => setCurrentPage(pageNumber);
const filteredEmployees = roleFilter === 'All' ? employees : employees.filter((employee) => employee.is_active_flag === (roleFilter === 'true'));
const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
// Change to the previous page

  return (
    <div className='contain-table'>
      <table className='striped-table'>
      <thead>
          <tr>
            <th>No.</th>
            <th>Role ID</th>
            <th>Department</th>
            <th>Role</th>
            <th colSpan={2} className='text-center'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee, i) => (
              <tr key={employee.role_id}>
                <td>{indexOfFirstItem + i + 1}</td>
                <td>{employee.role_id}</td>
                <td>{employee.dept_name}</td>
                <td>{employee.role_name}</td>
                <td className='text-right'>
                  <button onClick={() => handleUpdate(employee.role_id)} className='button muted-button'>
                    Edit
                  </button>
                </td>
                <td className='text-left'>
                  <button
                    className={`button ${activeStatus[employee.role_id] ? 'active-button' : 'muted-button'}`}
                    onClick={() => handleToggle(employee.role_id)}
                  >
                    {activeStatus[employee.role_id] ? 'Active' : 'Inactive'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className='pagination'>
        <Pagination
          onPageChange={onPageChange}
          totalCount={filteredEmployees.length}
          siblingCount={1}
          currentPage={currentPage}
          pageSize={itemsPerPage}
        />
        
      </div>
      
    </div>
  );
}

export default List;
