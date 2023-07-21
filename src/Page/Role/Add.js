import React, { useState, useEffect } from 'react'
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
            // Set the selectedEmployee data to initialize the state

          })
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    const handleAdd = e => {
        e.preventDefault();
        if (!deptName || !roleName) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const id = employees.length + 1;
        const newEmployee = {
            id,
            deptName,
            roleName,
        }
        employees.push(newEmployee);
        setEmployees(employees);
        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: ` ${roleName}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }
  

    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Role</h1>
                <label htmlFor="firstName">Department</label>
                        <select
          id="deptName"
          name="deptName"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
        >
          <option value="">Select Department</option>
          {departments.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
                <label htmlFor="roleName">Role</label>
                <input
                    id="roleName"
                    type="text"
                    name="roleName"
                    value={roleName}
                    onChange={e => setRoleName(e.target.value)}
                />
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

export default Add