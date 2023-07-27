import React, { useState } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import axios from 'axios';

interface Employee {
  emp_id: number;
  firstname: string;
  lastname: string;
  gender: string;
  address: string;
  email: string;
  mobile_no: number;
  age: number;
  date_of_join: string;
  dept_name: string;
  role_name: string;
}

interface EditProps {
  selectedEmployee: Employee;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const namePattern = /^[a-zA-Z]+$/;
const addressPattern = /^[a-zA-Z0-9\s,.:/\\-]+$/;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 25;
const emailPattern = /^(?![-_.])[a-zA-Z0-9_%+-]+(?!\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Edit({ selectedEmployee, employees, setEmployees, setIsEditing }: EditProps) {
  const [firstName, setFirstName] = useState<string>(selectedEmployee.firstname);
  const [lastName, setLastName] = useState<string>(selectedEmployee.lastname);
  const [gender, setGender] = useState<string>(selectedEmployee.gender);
  const [address, setAddress] = useState<string>(selectedEmployee.address);
  const [email, setEmail] = useState<string>(selectedEmployee.email);
  const [mobileNo, setMobileNo] = useState<string>(selectedEmployee.mobile_no.toString());
  const [age, setAge] = useState<string>(selectedEmployee.age.toString());
  const [date, setDate] = useState<string>(
    selectedEmployee.date_of_join ? selectedEmployee.date_of_join.split('T')[0] : ''
  );
  const [deptName, setDeptName] = useState<string>(selectedEmployee.dept_name);
  const [roleName, setRoleName] = useState<string>(selectedEmployee.role_name);

  const validateName = (name: string): boolean =>
    !name || !namePattern.test(name) || name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH;

  const validateEmail = (email: string): boolean => emailPattern.test(email);

  const validateMobileNo = (mobileNo: string): boolean =>
    mobileNo.length === 10 && !/^0+$/.test(mobileNo) && !isNaN(parseInt(mobileNo));

  const validateAge = (age: string): boolean =>
    !isNaN(parseInt(age)) && parseInt(age) >= 18 && parseInt(age) <= 70;

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateName(firstName) || validateName(lastName)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'First name and last name should not contain special characters.',
        showConfirmButton: true,
      });
    }

    if (!validateEmail(email)) {
      setEmail('');
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Invalid email address format.',
        showConfirmButton: true,
      });
    }

    if (!gender || !address || !email || !mobileNo || !age || !date || !deptName || !roleName) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    if (!validateMobileNo(mobileNo)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Mobile number must be a valid 10-digit number.',
        showConfirmButton: true,
      });
    }

    if (!validateAge(age)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Age must be between 18 and 70.',
        showConfirmButton: true,
      });
    }

    const updatedEmployee: Employee = {
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
    };

    axios
      .put(`http://192.168.11.150:4000/employees/${selectedEmployee.emp_id}`, updatedEmployee, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle the response from the API and update the employees state
        const updatedEmployees = employees.map((employee) =>
          employee.emp_id === selectedEmployee.emp_id ? response.data : employee
        );
        setEmployees(updatedEmployees);
        setIsEditing(false);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `${response.data.firstname} ${response.data.lastname}'s data has been updated.`,
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

  const handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setMobileNo(numericValue);
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        {/* First Name */}
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter First Name"
        />
        {!!firstName && !namePattern.test(firstName) && (
          <span style={{ color: 'red' }}>First name should not contain special characters.</span>
        )}
        {/* Last Name */}
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter Last Name"
        />
        {lastName && !namePattern.test(lastName) && (
          <span style={{ color: 'red' }}>Last name should not contain special characters.</span>
        )}
        {/* Gender */}
        <div>
          <label>Gender</label>
          <div className="gender">
            <div className="female">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={() => setGender('Female')}
              />{' '}
              Female
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={() => setGender('Male')}
              />{' '}
              Male
            </div>
          </div>
        </div>
        {/* Address */}
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"
          rows={4}
          cols={50}
          onKeyPress={(e) => {
            if (!addressPattern.test(e.key)) {
              e.preventDefault();
            }
          }}
          onKeyDown={(e) => {
            if (!addressPattern.test(e.key)) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            const pastedText = e.clipboardData.getData('text/plain');
            if (!addressPattern.test(pastedText)) {
              e.preventDefault();
            }
          }}
        />
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        {/* Mobile Number */}
        <label htmlFor="mobileNo">Mobile Number</label>
        <input
          id="mobileNo"
          type="tel"
          name="mobileNo"
          value={mobileNo}
          onChange={handleMobileNoChange}
          placeholder="Enter Mobile Number"
        />
        {/* Age */}
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
        />
        {/* Date of Joining */}
        <label htmlFor="date">Date of Joining</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={format(new Date(), 'yyyy-MM-dd')} // Set the max attribute to the current date
          min={format(
            new Date(new Date().getFullYear() - 4, new Date().getMonth(), new Date().getDate()),
            'yyyy-MM-dd'
          )} // Set the min attribute to 4 years ago
          placeholder="Select Date of Joining"
        />
        {/* Department Name */}
        <label htmlFor="deptName">Department Name</label>
        <input
          id="deptName"
          type="text"
          name="deptName"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
        />
        {/* Role Name */}
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
