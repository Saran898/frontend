import React, { useState ,useEffect} from 'react';
import Swal from 'sweetalert2';

function Edit({ selectedEmployee, employees, setEmployees, setIsEditing }) {
  const id = selectedEmployee._id; // Use _id from the selectedEmployee object

  useEffect(() => {
    setRoleName(selectedEmployee.role_name);
    setDeptName(selectedEmployee.dept_name);
  }, [selectedEmployee]);

  const [firstName, setFirstName] = useState(selectedEmployee.firstname);
  const [lastName, setLastName] = useState(selectedEmployee.lastname);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [date, setDate] = useState(selectedEmployee.date_of_join);
  const [gender, setGender] = useState(selectedEmployee.gender);
  const [address, setAddress] = useState(selectedEmployee.address);
  const [mobileNo, setMobileNo] = useState(selectedEmployee.mobile_no);
  const [deptName, setDeptName] = useState(selectedEmployee.dept_name);
  const [roleName, setRoleName] = useState(selectedEmployee.role_name);
 

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedEmployee = {
      _id: id, // Use _id in the updated employee object
      firstname: firstName,
      lastname: lastName,
      email,
      date_of_join: date,
      gender,
      address,
      mobile_no: mobileNo,
      dept_name: deptName,
      role_name: roleName,
    };

    // Map over the employees array and update the selected employee
    const updatedEmployees = employees.map((employee) =>
      employee._id === id ? updatedEmployee : employee
    );

    setEmployees(updatedEmployees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${updatedEmployee.firstname} ${updatedEmployee.lastname}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                  
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="mobileNo">Mobile No</label>
                <input
                  id="mobileNo"
                  type="text"
                  name="mobileNo"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
                
                
                <label htmlFor="deptName">Department Name</label>
                <input
                  id="deptName"
                  type="text"
                  name="deptName"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                />
                
                <label htmlFor="roleName">Role Name</label>
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

export default Edit