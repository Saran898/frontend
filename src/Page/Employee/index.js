import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2';
import './spinner.css'
import Header from './Header_emp';
import List from './List_emp';
import Add from './Add_emp';
import Edit from './Edit_emp';

import { employeesData } from '../../data';
import { HashLoader } from 'react-spinners';

function Employee() {

    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id) => {
        const [employee] = employees.filter(employee => employee.id === id);

        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const [employee] = employees.filter(employee => employee.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter(employee => employee.id !== id));
            }
        });
    }
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
      setLoading(false)
    },2000)
    },[])

    return (
        <div className='container'>
             {
        loading?
      <HashLoader className='spinners'color={'#404e67'} loading={loading} size={150} align-item={'center'}/>
      :
      
      <div>
 {/* List */}
 {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding}
                    />
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
      </div>
             }
           
        </div>
    )
}

export default Employee;