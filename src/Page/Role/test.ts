import React, { useState } from 'react';
import Add from './Add'; // Import the Add component from Add.tsx

interface Employee {
  id: number;
  deptName: string;
  roleName: string;
  inserted_by_name: string;
}

function Test() {
  // Define a state to store the employees
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Define a state to control the "isAdding" state
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Render the Add component and pass the necessary props
  return (
    <div>
      {/* Render the employees here */}
      {employees.map((employee) => (
        <div key={employee.id}>
          <p>ID: {employee.id}</p>
          <p>Department: {employee.deptName}</p>
          <p>Role: {employee.roleName}</p>
          <p>Inserted By: {employee.inserted_by_name}</p>
        </div>
      ))}

      {/* Render the Add component */}
      {isAdding ? (
        <Add employees={employees} setEmployees={setEmployees} setIsAdding={setIsAdding} />
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Employee</button>
      )}
    </div>
  );
}

export default Test;
