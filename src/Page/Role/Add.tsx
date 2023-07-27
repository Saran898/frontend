import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
interface Role {
  dept_name: string;
  role_name: string;
}
interface Employee {
  id: number;
  deptName: string;
  roleName: string;
  inserted_by_name: string;
}
interface AddProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}
function Add({ employees, setEmployees, setIsAdding }: AddProps) {
  const [roleName, setRoleName] = useState<string>('');
  const [deptName, setDeptName] = useState<string>('');
  const [departments, setDepartments] = useState<string[]>([]);
  useEffect(() => {
    axios.get('http://192.168.11.150:4000/roles')
      .then((response) => {
        const data: Role[] = response.data;
        const uniqueDepartments = [...new Set(data.map((role) => role.dept_name))];
        setDepartments(uniqueDepartments);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!deptName || !roleName) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }
    const newRole: Role = {
      dept_name: deptName,
      role_name: roleName,
    };
    const config = { // Moved the config object outside the component function
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: false,
    };
    axios.post('http://192.168.11.150:4000/roles', newRole, config)
    .then((response) => {
      const data: Role = response.data;
      const id = employees.length + 1;
      const newEmployee: Employee = {
        id,
        deptName: data.dept_name,
        roleName: data.role_name,
        inserted_by_name: 'Naga',
      };
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
          onChange={(e) => setRoleName(e.target.value)}
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
export default Add;
