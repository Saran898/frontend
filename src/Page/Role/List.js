import React,  {useState ,useEffect} from 'react'

function List({ handleEdit }) {
    // const [isActive, setIsActive] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [activeStatus, setActiveStatus] = useState(true);

    const handleToggle = (id)=> {
       setActiveStatus((prevStatus) => ({
         ...prevStatus,
         [id]: !prevStatus[id],
       }));
     };
  useEffect(() => {
    fetch('http://192.168.11.150:4000/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

 
    return (
        <div className='contain-table'>
            <table className='striped-table'>
                <thead>
                    <tr>
                        <th>Emp ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date of Join</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.length > 0 ? (
                        currentEmployees.map((employee, i) => (
                            <tr key={employee._id}>
                                <td>{employee.emp_id}</td>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.date_of_join} </td>
                                <td>{employee.dept_name}</td>
                                <td>{employee.role_name}</td>
                                <td className="text-right">
                                <button
                                        onClick={() => handleEdit(employee.id)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="text-left">
                                <button
                    className={`button ${activeStatus[employee._id] ?'muted-button' :'active-button' }`}
                    onClick={() => handleToggle(employee._id)}
                  >
                                      {activeStatus[employee._id] ? 'Inactive':'Active' }
                                  
                                </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No Employees</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='pagination'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
        </div>
    )
}

export default List