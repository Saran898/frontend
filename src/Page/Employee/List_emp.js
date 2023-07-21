import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
function List({ handleEdit, handleDelete }) {
  const [employees, setEmployees] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  useEffect(() => {
    // Fetch data from the API
    fetch('http://192.168.11.150:4000/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run the effect only once on component mount

  // Get the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Change page
  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);
  // Change to the previous page

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee, i) => (
              <tr key={employee._id}>
                <td>{i + 1}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{formatter.format(employee.salary)}</td>
                <td>{employee.date_of_join}</td>
                <td className="text-right">
                  <button onClick={() => handleEdit(employee._id)} className="button muted-button">
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button onClick={() => handleDelete(employee._id)} className="button muted-button">
                    Delete
                  </button>
                </td>
                <td className="text-left">
                  <button
                    className={`button ${isActive ? 'active-button' : 'muted-button'}`}
                    onClick={handleToggle}
                  >
                    {isActive ? 'Active' : 'Inactive'}
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
          totalCount={employees.length}
          siblingCount={1}
          currentPage={currentPage}
          pageSize={itemsPerPage}
        />
      </div>
    </div>
  );
}

export default List;
