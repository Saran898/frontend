import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header_emp';
import List from './List_emp';
import Add from './Add_emp';
import Edit from './Edit_emp';

import { employeesData } from '../../data';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch employees from the backend API here
    fetch('http://192.168.11.150:4000/employees') // Replace this with your actual backend route
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id) => {
    const [employee] = filteredUsers.filter((employee) => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        fetch(`http://192.168.11.150:4000/employees/${id}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: `${data.firstName} ${data.lastName}'s data has been deleted.`,
              showConfirmButton: false,
              timer: 1500,
            });
  
            // Fetch updated employees list from the API and update both states
            fetch('http://192.168.11.150:4000/employees')
              .then((response) => response.json())
              .then((data) => {
                setEmployees(data);
                setFilteredUsers(data);
              })
              .catch((error) => console.error('Error fetching data:', error));
          })
          .catch((error) => console.error('Error deleting data:', error));
      }
    });
  };
  
  
  
  

  const filterBySearch = (searchValue) => {
    // Filter the employees based on the search input value in the role_name field
    const filtered = employees.filter((employee) => {
      return employee.role_name.toLowerCase().includes(searchValue.toLowerCase());
    });

    // Update the employees list with the filtered results
    setFilteredUsers(filtered);
  };

  return (
    <div className='container'>
      {/* List */}
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} filterBySearch={filterBySearch} setFilteredUsers={setFilteredUsers} />

<List filteredUsers={filteredUsers} handleEdit={handleEdit} handledelete={handleDelete} />

        </>
      )}
      {/* Add */}
      {isAdding && <Add employees={employees} setEmployees={setEmployees} setIsAdding={setIsAdding} />}
      {/* Edit */}
      {isEditing && (
        <Edit employees={filteredUsers} selectedEmployee={selectedEmployee} setEmployees={setEmployees} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}

export default Employee;
