import React, { useState, useEffect } from 'react';

function List({ handleUpdate,roleFilter }) {
  const [employees, setEmployees] = useState([]);
  const [activeStatus, setActiveStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  const handleToggle = (id) => {
    setActiveStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
  };
 
  useEffect(() => {
    fetch('http://192.168.11.150:4000/employees')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        // Set the activeStatus based on the data
        const initialActiveStatus = {};
        data.forEach((employee) => {
          initialActiveStatus[employee._id] = employee.is_active_flag;
        });
        setActiveStatus(initialActiveStatus);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to convert ISO 8601 date to desired format (YYYY-MM-DD)
  const convertDateToDisplayFormat = (isoDate) => {
    const dateObj = new Date(isoDate);
    return dateObj.toISOString().split('T')[0]; // Get the first part of the ISO date (YYYY-MM-DD)
  };

  // Get the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const filteredEmployees = roleFilter === 'All' ? employees : employees.filter((employee) => employee.is_active_flag === (roleFilter === 'true'));
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className='contain-table'>
      <table className='striped-table'>
      <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Join</th>
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
              <tr key={employee._id}>
                <td>{indexOfFirstItem + i + 1}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{convertDateToDisplayFormat(employee.date_of_join)}</td>
                <td>{employee.dept_name}</td>
                <td>{employee.role_name}</td>
                <td className='text-right'>
                  <button onClick={() => handleUpdate(employee._id)} className='button muted-button'>
                    Edit
                  </button>
                </td>
                <td className='text-left'>
                  <button
                    className={`button ${activeStatus[employee._id] ? 'active-button' : 'muted-button'}`}
                    onClick={() => handleToggle(employee._id)}
                  >
                    {activeStatus[employee._id] ? 'Active' : 'Inactive'}
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
        {Array.from({ length: Math.ceil(employees.length / itemsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default List;
