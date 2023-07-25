import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Edit({ selectedEmployee, employees, setEmployees, setIsEditing }) {
  const [firstName, setFirstName] = useState(selectedEmployee.firstname);
  const [lastName, setLastName] = useState(selectedEmployee.lastname);
  const [gender, setGender] = useState(selectedEmployee.gender);
  const [address, setAddress] = useState(selectedEmployee.address);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [mobileNo, setMobileNo] = useState(selectedEmployee.mobile_no);
  const [age, setAge] = useState(selectedEmployee.age);
  const [date, setDate] = useState(selectedEmployee.date_of_join ? selectedEmployee.date_of_join.split('T')[0] : '');
  const [deptName, setDeptName] = useState(selectedEmployee.dept_name);
  const [roleName, setRoleName] = useState(selectedEmployee.role_name);

  const namePattern = /^[a-zA-Z]+$/;

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Updating state:', {
      firstName,
      lastName,
      gender,
      // Add other state variables here...
    });

    // Validation code (same as in Add component)

    // Update the edited employee data
    const updatedEmployee = {
      emp_id: selectedEmployee.emp_id,
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      address: address,
      email: email,
      mobile_no: parseInt(mobileNo),
      age: parseInt(age),
      date_of_join: new Date(date).toISOString(),
      dept_name: deptName,
      role_name: roleName,
      inserted_by: 'admin',
    };

    // Send the data to the server using fetch
    fetch(`http://192.168.11.150:4000/employees/${selectedEmployee.emp_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API and update the employees state
        const updatedEmployees = employees.map((employee) =>
          employee.emp_id === selectedEmployee.emp_id ? data : employee
        );
        setEmployees(updatedEmployees);
        setIsEditing(false);

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `${data.firstname} ${data.lastname}'s data has been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // Handle errors from the API request
        console.error('Error updating employee:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update employee data.',
          showConfirmButton: true,
        });
      });
  };

  const handleMobileNoChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setMobileNo(numericValue);
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
          onChange={(e) => setFirstName(e.target.value)}
        />
        {/* Validation message */}
        {!!firstName && !namePattern.test(firstName) && (
          <span style={{ color: 'red' }}>First name should not contain special characters.</span>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {/* Validation message */}
        {lastName && !namePattern.test(lastName) && (
          <span style={{ color: 'red' }}>Last name should not contain special characters.</span>
        )}

        <div>
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === 'Female'}
            onChange={() => setGender('Female')}
          />{' '}
          Female
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === 'Male'}
            onChange={() => setGender('Male')}
          />{' '}
          Male
        </div>

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="mobileNo">Mobile Number</label>
        <input
          id="mobileNo"
          type="tel"
          name="mobileNo"
          value={mobileNo}
          onChange={handleMobileNoChange}
        />

        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label htmlFor="date">Date of Joining</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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

export default Edit;
