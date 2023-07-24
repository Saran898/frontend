import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

function Add({ employees, setEmployees, setIsAdding }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(''); // Updated to radio buttons
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [deptName, setDeptName] = useState(''); // Dropdown for department name
  const [roleName, setRoleName] = useState(''); // Dropdown for role name
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const textInput = useRef(null);

  // Define the name pattern for first name and last name
  const namePattern = /^[a-zA-Z]+$/;

  useEffect(() => {
    fetch('http://192.168.11.150:4000/employees')
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response and update the employees state
        setEmployees(data);
        const uniqueDepartments = [...new Set(data.map((role) => role.dept_name))];
        // Set the unique department names to the state
        setDepartments(uniqueDepartments);
        const uniqueRoles = [...new Set(data.map((role) => role.role_name))];
        // Set the unique department names to the state
        setRoles(uniqueRoles);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAdd = (e) => {

    e.preventDefault();
    

    // Validation for first name and last name to disallow special characters
    let hasError = false;

    if (!firstName || !namePattern.test(firstName)) {
      setFirstName('');
      hasError = true;
    }

    if (!lastName || !namePattern.test(lastName)) {
      setLastName('');
      hasError = true;
    }

    if (hasError) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'First name and last name should not contain special characters.',
        showConfirmButton: true,
      });
    }

    // Other validations as before
    if (!gender || !address || !email || !mobileNo || !age || !date || !deptName || !roleName) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    // Validate mobile number and age
    if (isNaN(mobileNo) || isNaN(age)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Mobile number and age must be valid numbers.',
        showConfirmButton: true,
      });
    }

    // Validate mobile number length
    if (mobileNo.length !== 10) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Mobile number must be 10 digits long.',
        showConfirmButton: true,
      });
    }

    // Validate age range (between 18 and 70)
    if (age < 18 || age > 70) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Age must be between 18 and 70.',
        showConfirmButton: true,
      });
    }

// Add the new employee data
const newEmployee = {
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

// Log the inserted data to the console (optional)
console.log('Inserted Employee Data:', newEmployee);

// Send the data to the server using fetch
fetch('http://192.168.11.150:4000/employees', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newEmployee),
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the response from the API, update the employees state, and show success message
    setEmployees([...employees, data]);
    setIsAdding(false);
    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  })
  .catch((error) => {
    // Handle errors from the API request
    console.error('Error adding new employee:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',  
      text: 'Failed to add new employee.',
      showConfirmButton: true,
    });
  });

  };

  // Function to handle entering only numbers for mobile number
  const handleMobileNoChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setMobileNo(numericValue);
  };

  // Dropdown options for department names and role names
  // const departmentOptions = [
  //   'Admin',
  //   'Finance',
  //   'HR',
  //   // Add other department names as needed
  // ];

  // const roleOptions = [
  //   'CEO',
  //   'Manager',
  //   'Employee',
  //   // Add other role names as needed
  // ];

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          ref={textInput}
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {firstName && !namePattern.test(firstName) && (
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
        <select
          id="deptName"
          name="deptName"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <label htmlFor="roleName">Role Name</label>
        <select
          id="roleName"
          name="roleName"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
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
