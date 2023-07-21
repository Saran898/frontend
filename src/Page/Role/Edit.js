import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Edit({ selectedEmployee, setEmployees, setIsEditing }) {
  const id = selectedEmployee.role_id; // Use _id from the selectedEmployee object
  console.log(selectedEmployee); // Add this line to check the selectedEmployee prop

  useEffect(() => {
    fetch('http://192.168.11.150:4000/roles')
      .then((response) => response.json())
      .then((data) => {
        // Set the data from the API to the state
        const uniqueDepartments = [...new Set(data.map((role) => role.dept_name))];
        // Set the unique department names to the state
        setDepartments(uniqueDepartments);
        // Set the selectedEmployee data to initialize the state
        setRoleName(selectedEmployee.role_name);
        setDeptName(selectedEmployee.dept_name);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [selectedEmployee]);

  const [departments, setDepartments] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [deptName, setDeptName] = useState('');

  const handleEdit = (e) => {
    e.preventDefault();

    if (!roleName || !deptName) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedEmployee = {
      role_id: id, // Use _id in the updated employee object
      dept_name: deptName,
      role_name: roleName,
    };

    // ... existing code ...

  };

  return (
    <div className="small-container">
      <form onSubmit={handleEdit}>
        <h1>Edit Role</h1>
        <label htmlFor="firstName">Department</label>
        <select
          id="deptName"
          name="deptName"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        <label htmlFor="roleName">Role</label>
        <input
          id="roleName"
          type="text"
          name="roleName"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Edit;
