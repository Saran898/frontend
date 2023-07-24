import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Add({ employees, setEmployees, setIsAdding }) {
  const [roleName, setRoleName] = useState('');
  const [deptName, setDeptName] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('http://192.168.11.150:4000/roles')
      .then((response) => response.json())
      .then((data) => {
        // Extract unique department names from the data fetched from the API
        const uniqueDepartments = [...new Set(data.map((role) => role.dept_name))];
        // Set the unique department names to the state
        setDepartments(uniqueDepartments);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!deptName || !roleName) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newRole = {
      dept_name: deptName,
      role_name: roleName,
      inserted_by_name: 'Naga', // Set the inserted_by_name to 'Naga'
    };
    // console.log('Inserted Employee Data:', newRole.inserted_by_name);
    // Make the API request to create a new role
    fetch('http://192.168.11.150:4000/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRole),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API, update the employees state, and show success message
        const id = employees.length + 1;
        const newEmployee = {
          id,
          deptName: data.dept_name,
          roleName: data.role_name,
          inserted_by_name: 'Naga',
        };
        // console.log('Inserted Employee Data:', newEmployee.inserted_by_name);
        setEmployees([...employees, newEmployee]);
        setIsAdding(false);
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `${roleName}'s data has been Added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // Handle errors from the API request
        console.error('Error adding new employee role:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to add new employee role.',
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Role</h1>
        <label htmlFor="firstName">Department</label>
        <select id="deptName" name="deptName" value={deptName} onChange={(e) => setDeptName(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <label htmlFor="roleName">Role</label>
        <input id="roleName" type="text" name="roleName" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Add;
