import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Edit({ selectedEmployee, employees, setEmployees, setIsEditing }) {
  const id = selectedEmployee._id; // Use _id from the selectedEmployee object

  const [firstName, setFirstName] = useState(selectedEmployee.firstname);
  const [lastName, setLastName] = useState(selectedEmployee.lastname);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [date, setDate] = useState(selectedEmployee.date_of_join);

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
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
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