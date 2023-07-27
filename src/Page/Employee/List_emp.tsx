import React, { useState } from 'react';
import Pagination from './Pagination';
import './List_emp.css';
interface Employee {
  emp_id: number;
  firstname: string;
  lastname: string;
  email: string;
  date_of_join: string;
  dept_name: string;
  role_name: string;
  is_active_flag: boolean;
}

interface Props {
  handleDelete: (empId: number) => void;
  handleEdit: (empId: number) => void;
  handleToggle: (empId: number, isActive: boolean) => void;
  filteredUsers: Employee[];
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

function List({ handleDelete, handleEdit, handleToggle, filteredUsers, setSelectedEmployee }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  // Function to convert ISO 8601 date to desired format (YYYY-MM-DD)
  const convertDateToDisplayFormat = (isoDate: string): string => {
    const dateObj = new Date(isoDate);
    return dateObj.toISOString().split('T')[0]; // Get the first part of the ISO date (YYYY-MM-DD)
  };

  // Get the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Change page
  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  const currentEmployees = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='contain-table'>
      <table className='striped-table'>
        <thead>
          <tr>
            {/* <th className='no'>S.No</th> */}
            <th className='Empid'>Emp ID</th>
            <th className='Empfname'>First Name</th>
            <th className='Emplname'>Last Name</th>
            <th className='Empemail'>Email</th>
            <th className='Empdob'>Date of Join</th>
            <th className='Empdept'>Department</th>
            <th className='Emprole'>Role</th>
            <th colSpan={3} className='text-center'>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee, i) => (
              <tr key={employee.emp_id}>
                {/* <td className='no1' >{indexOfFirstItem + i + 1}</td> */}
                <td className='Empid'>{employee.emp_id}</td>
                <td className='Empfname'>{employee.firstname}</td>
                <td className='Emplname'>{employee.lastname}</td>
                <td className='Empemail'>{employee.email}</td>
                <td className='Empdob'>{convertDateToDisplayFormat(employee.date_of_join)}</td>
                <td className='Empdept'>{employee.dept_name}</td>
                <td className='Emprole'>{employee.role_name}</td>
                <td className='text-right'>
                  <button
                    onClick={() => {
                      handleEdit(employee.emp_id);
                      setSelectedEmployee(employee); // Set the selected employee in the Employee component
                    }}
                    className='button muted-button'
                    title='Edit Employee'
                  >
                    Edit
                  </button>
                </td>
                <td className='text-right'>
                  <button
                    onClick={() => handleDelete(employee.emp_id)}
                    className='button muted-button'
                    title='Delete Employee'
                  >
                    Delete
                  </button>
                </td>
                <td className='text-left'>
                  <button
                    className={`button ${employee.is_active_flag ? 'active-button' : 'muted-button'}`}
                    onClick={() => handleToggle(employee.emp_id, !employee.is_active_flag)}
                    title={employee.is_active_flag ? 'Active Employee' : 'Inactive Employee'}
                  >
                    {employee.is_active_flag ? 'Active' : 'Inactive'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='pagination'>
        <Pagination
          onPageChange={onPageChange}
          totalCount={filteredUsers.length}
          siblingCount={1}
          currentPage={currentPage}
          pageSize={itemsPerPage}
        />
      </div>
    </div>
  );
}

export default List;
