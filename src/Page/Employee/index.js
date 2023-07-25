import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header_emp';
import List from './List_emp';
import Add from './Add_emp';
import Edit from './Edit_emp';

// import { employeesData } from '../../data';

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

  const handleEdit = (emp_id) => {
    const selectedEmployee = filteredUsers.find((employee) => employee.emp_id === emp_id);
    setSelectedEmployee(selectedEmployee);
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

  const handleToggle = (id, isActive) => {
    // Make an API call to update the isActive status of the employee based on the `isActive` argument
    // For example, if isActive is true, make a PUT request to activate the employee, otherwise, make a PUT request to deactivate the employee.
    const updateData = { is_active_flag: isActive };
    fetch(`http://192.168.11.150:4000/employees/inactive/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Fetch updated employees list from the API and update both states
        fetch('http://192.168.11.150:4000/employees')
          .then((response) => response.json())
          .then((data) => {
            // After updating the status on the server, update the employees and filteredUsers states
            setEmployees((prevEmployees) =>
              prevEmployees.map((employee) =>
                employee.id === id ? { ...employee, is_active_flag: isActive } : employee
              )
            );
            setFilteredUsers(data);
          })
          .catch((error) => console.error('Error fetching data:', error));
      })
      .catch((error) => console.error('Error updating status:', error));
  };
  
  

  const filterBySearch = (searchValue) => {
    // Filter the employees based on the search input value in the role_name field
    const filtered = employees.filter((employee) => {
      return employee.role_name.toLowerCase().includes(searchValue.toLowerCase());
    });

    // Update the employees list with the filtered results
    setFilteredUsers(filtered);
  };

  // const filterBySearch = (searchText) => {
  //   // Convert searchText to lowercase for case-insensitive matching
  //   const lowerSearchText = searchText.toLowerCase();
  
  //   // Check if the search text has at least three characters
  //   if (lowerSearchText.length >= 3) {
  //     // Filter employees based on the first three characters of their names
  //     const filtered = employees.filter((employee) =>
  //       employee.role_name.toLowerCase().startsWith(lowerSearchText.slice(0, 3))
  //     );
  
  //     // Update the filtered users using setFilteredUsers
  //     setFilteredUsers(filtered);
  //   } else {
  //     // If the search text has less than three characters, reset the filtered list to show all employees
  //     setFilteredUsers(employees);
  //   }
  // };
  // const handleCancel = () => {
  //   setIsEditing(false);
  // };

  return (
    <div className='container'>
    {/* List */}
    {!isAdding && !isEditing && (
      <>
        <Header setIsAdding={setIsAdding} filterBySearch={filterBySearch} setFilteredUsers={setFilteredUsers} />
        <List
          // filteredUsers={filteredUsers}
          // handleEdit={handleEdit} // Pass the handleEdit function to List component
          // handleDelete={handleDelete}
          // handleToggle={handleToggle}
          filteredUsers={filteredUsers}
            handleEdit={handleEdit} // Pass the handleEdit function to List component
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            selectedEmployee={selectedEmployee} // Pass selectedEmployee state down to List component
            setSelectedEmployee={setSelectedEmployee} // Pass setSelectedEmployee function down to List component
        />
      </>
    )}
    {/* Add */}
    {isAdding && <Add employees={employees} setEmployees={setEmployees} setIsAdding={setIsAdding} />}
    {/* Edit */}
    {isEditing && (
      <Edit
        selectedEmployee={selectedEmployee}
        employees={filteredUsers} // Pass filteredUsers to handle fetching updated data after edit
        setEmployees={setEmployees}
        setIsEditing={setIsEditing}
      />


    )}
  </div>
);
}

export default Employee;
