import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import './List.css'
interface Employee {
  role_id: number;
  dept_name: string;
  role_name: string;
  is_active_flag: boolean;
}
interface ListProps {
  handleUpdate: (id: number) => void;
  roleFilter: string;
  setSelectedEmployee: (employee: Employee) => void;
}
function List({ handleUpdate, roleFilter, setSelectedEmployee }: ListProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activeStatus, setActiveStatus] = useState<{ [id: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // Number of items to display per page
  // Fetch data and initialize activeStatus on component mount and whenever roleFilter changes
  useEffect(() => {
    fetch('http://192.168.11.150:4000/roles')
      .then((response) => response.json())
      .then((data: Employee[]) => {
        setEmployees(data);
        // Set the activeStatus based on the data
        const initialActiveStatus: { [id: number]: boolean } = {};
        data.forEach((employee) => {
          initialActiveStatus[employee.role_id] = employee.is_active_flag;
        });
        setActiveStatus(initialActiveStatus);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [roleFilter]); // Add roleFilter as a dependency
  const handleToggle = (id: number) => {
    // Determine the current status of the role
    const currentStatus = activeStatus[id];
    // Determine the new status (active/inactive)
    const newStatus = !currentStatus;
    // Toggle the active status in the local state
    setActiveStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !currentStatus,
    }));
    // Make the API call to update the role status
    fetch(`http://192.168.11.150:4000/ract/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_active_flag: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update the role status.');
        }
        // Role status updated successfully, you may want to handle this
      })
      .catch((error) => {
        console.error('Error updating the role status:', error);
        // Revert the local state change if the API call fails
        setActiveStatus((prevStatus) => ({
          ...prevStatus,
          [id]: currentStatus,
        }));
      });
  };
  // Get the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Change page
  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  const filteredEmployees = roleFilter === 'All' ? employees : employees.filter((employee) => employee.is_active_flag === (roleFilter === 'true'));
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className='contain-table'>
      <table className='striped-table'>
        <thead>
          <tr>
            <th className='No'>No.</th>
            <th className='Roleid'>Role ID</th>
            <th className='Department'>Department</th>
            <th className='Role'>Role</th>
            <th colSpan={2} className='text-center'></th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee, i) => (
              <tr key={employee.role_id}>
                <td className='No1'>{indexOfFirstItem + i + 1}</td>
                <td className='emproleid'>{employee.role_id}</td>
                <td className='empdeptname'>{employee.dept_name}</td>
                <td className='emprolename'>{employee.role_name}</td>
                <td className='text-right'>
                  <button
                    onClick={() => {
                      handleUpdate(employee.role_id);
                      setSelectedEmployee(employee); // Set the selected employee in the Employee component
                    }}
                    className='button muted-button'
                    title='Edit Role'
                  >
                    Edit
                  </button>
                </td>
                <td className='text-left'>
                  <button
                    className={`button ${activeStatus[employee.role_id] ? 'active-button' : 'muted-button'}`}
                    onClick={() => handleToggle(employee.role_id)}
                    title={activeStatus[employee.role_id] ? 'Active Role' : 'Inactive Role'}
                  >
                    {activeStatus[employee.role_id] ? 'Active' : 'Inactive'}
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
          totalCount={filteredEmployees.length}
          siblingCount={1}
          currentPage={currentPage}
          pageSize={itemsPerPage}
        />
      </div>
    </div>
  );
}
export default List;
