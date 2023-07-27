import React, { useEffect, useReducer, useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
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
interface State {
  departments: string[];
  roleName: string;
  deptName: string;
}
type Action =
  | { type: 'SET_DEPARTMENTS'; payload: string[] }
  | { type: 'SET_ROLE_NAME'; payload: string }
  | { type: 'SET_DEPT_NAME'; payload: string };
const initialState: State = {
  departments: [],
  roleName: '',
  deptName: '',
};
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DEPARTMENTS':
      return { ...state, departments: action.payload };
    case 'SET_ROLE_NAME':
      return { ...state, roleName: action.payload };
    case 'SET_DEPT_NAME':
      return { ...state, deptName: action.payload };
    default:
      return state;
  }
}
function Edit({ selectedEmployee, setEmployees, setIsEditing }: EditProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialSelectedEmployeeRef = useRef(selectedEmployee);
  useEffect(() => {
    const initialSelectedEmployee = initialSelectedEmployeeRef.current;
    axios
      .get('http://192.168.11.150:4000/roles')
      .then((response) => {
        const data: Role[] = response.data;
        // Set the data from the API to the state
        const uniqueDepartments = [...new Set(data.map((role) => role.dept_name))];
        // Set the unique department names to the state
        dispatch({ type: 'SET_DEPARTMENTS', payload: uniqueDepartments });
        // Set the selectedEmployee data to initialize the state
        dispatch({ type: 'SET_ROLE_NAME', payload: initialSelectedEmployee.role_name });
        dispatch({ type: 'SET_DEPT_NAME', payload: initialSelectedEmployee.dept_name });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { roleName, deptName } = state;
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
    // Send the updated role data to the server using axios
    axios
      .put(`http://192.168.11.150:4000/roles/${selectedEmployee.role_id}`, updatedRole, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Assuming you have a function to update the selectedEmployee in the parent component
        setEmployees((prevEmployees) => {
          // Find the selected employee and update it in the employees array
          const updatedEmployees = prevEmployees.map((employee) =>
            employee.role_id === selectedEmployee.role_id ? { ...employee, ...updatedRole } : employee
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
  const { departments, roleName, deptName } = state;
  return (
    <div className="small-container">
      <form onSubmit={handleEdit}>
        <h1>Edit Role</h1>
        <label htmlFor="firstName">Department</label>
        <select
          id="deptName"
          name="deptName"
          value={deptName}
          onChange={(e) => dispatch({ type: 'SET_DEPT_NAME', payload: e.target.value })}
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
          onChange={(e) => dispatch({ type: 'SET_ROLE_NAME', payload: e.target.value })}
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
