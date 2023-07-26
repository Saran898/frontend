import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface Role {
  dept_name: string;
  role_name: string;
}

interface Employee {
  role_id: number;
  dept_name: string;
  role_name: string;
}

interface EditProps {
  selectedEmployee: Employee;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function Edit({ selectedEmployee, setEmployees, setIsEditing }: EditProps) {
  const id = selectedEmployee.role_id; // Use role_id from the selectedEmployee object

  useEffect(() => {
    fetch('http://192.168.11.150:4000/roles')
      .then((response) => response.json())
      .then((data: Role[]) => {
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

  useEffect(() => {
    fetch(`http://192.168.11.150:4000/roles/${id}`)
      .then((response) => response.json())
      .then((data: Role) => {
        // Set the data from the API to the state
        setRoleName(data.role_name);
        setDeptName(data.dept_name);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const [departments, setDepartments] = useState<string[]>([]);
  const [roleName, setRoleName] = useState<string>('');
  const [deptName, setDeptName] = useState<string>('');

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roleName || !deptName) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }
    const updatedRole: Role = {
      role_name: roleName,
      dept_name: deptName,
    };

    // Send the updated role data to the server using fetch
    fetch(`http://192.168.11.150:4000/roles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRole),
    })
      .then((response) => response.json())
      .then((data: Role) => {
        // Assuming you have a function to update the selectedEmployee in the parent component
        setEmployees((prevEmployees) => {
          // Find the selected employee and update it in the employees array
          const updatedEmployees = prevEmployees.map((employee) =>
            employee.role_id === id ? { ...employee, ...updatedRole } : employee
          );
          return updatedEmployees;
        });

        // Close the editing mode
        setIsEditing(false);

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Role data has been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error('Error updating role:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update role.',
          showConfirmButton: true,
        });
      });
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
