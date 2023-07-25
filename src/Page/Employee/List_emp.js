import React, { useState } from 'react';
import Pagination from './Pagination.js';

function List({ handleDelete, handleEdit, handleToggle, filteredUsers, selectedEmployee, setSelectedEmployee }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to display per page

  // Function to convert ISO 8601 date to desired format (YYYY-MM-DD)
  const convertDateToDisplayFormat = (isoDate) => {
    const dateObj = new Date(isoDate);
    return dateObj.toISOString().split('T')[0]; // Get the first part of the ISO date (YYYY-MM-DD)
  };

  // Get the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Change page
  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const currentEmployees = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='contain-table'>
      <table className='striped-table'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Join</th>
            <th>Department</th>
            <th>Role</th>
            <th colSpan={3} className='text-center'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee, i) => (
              <tr key={employee.emp_id}>
                <td>{indexOfFirstItem + i + 1}</td>
                <td>{employee.emp_id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{convertDateToDisplayFormat(employee.date_of_join)}</td>
                <td>{employee.dept_name}</td>
                <td>{employee.role_name}</td>
                <td className='text-right'>
                <button onClick={() => {
                    handleEdit(employee.emp_id);
                    setSelectedEmployee(employee); // Set the selected employee in the Employee component
                  }} className='button muted-button'>
                    Edit
                  </button>
                </td>
                <td className='text-right'>
                  <button onClick={() => handleDelete(employee.emp_id)} className='button muted-button'>
                    Delete
                  </button>
                </td>
                <td className='text-left'>
                  <button
                    className={`button ${employee.is_active_flag ? 'active-button' : 'muted-button'}`}
                    onClick={() => handleToggle(employee.emp_id, !employee.is_active_flag)}
                  >
                    {employee.is_active_flag ? 'Active' : 'Inactive'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className='pagination'>
        <Pagination
          onPageChange={onPageChange}
          totalCount={filteredUsers.length}
          siblingCount={1}
          currentPage={currentPage}
          pageSize={itemsPerPage}
        />
      </div>
    </div>
  );
}

export default List;
