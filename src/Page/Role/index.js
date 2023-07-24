// Role.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { employeeData } from '../../data';

function Role(handleToggle) {
  const [employees, setEmployees] = useState(employeeData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [roleFilter, setRoleFilter] = useState('All');

  const handleUpdate = (employeeId) => {
    // Find the selected employee based on the employeeId
    const selectedEmployee = employees.find((employee) => employee.role_id === employeeId);
    setSelectedEmployee(selectedEmployee);
    setIsEditing(true);
  };
  // const handleToggle = (id) => {
  //   // ... (the implementation of the handleToggle function) ...
  // };

  const handleRoleFilter = (filter) => {
    setRoleFilter(filter);
  };
  console.log(roleFilter);

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const employeeToDelete = employees.find((employee) => employee.role_id === id); // Use _id instead of id

        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.role_id !== id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employeeToDelete.firstName} ${employeeToDelete.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    
  };

  return (
    <div className='container'>
      {/* ... other components ... */}
      {/* List */}
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} handleRoleFilter={handleRoleFilter} />
          <List
            employees={employees}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleToggle={handleToggle} // Pass the handleToggle function as a prop
            roleFilter={roleFilter}
          />
        </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Role;