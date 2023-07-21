import React, {useState} from 'react'

import Swal from 'sweetalert2';
import Add from './Add';
import Edit from './Edit';
import List from './List';
import Header from './Header';
import { employeesData } from '../../data';


function Dashboard() {

    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

const handleEdit = () => {
////
}

const handleDelete = () => {
    /////
}
  return (
    <div className='container'>
    { !isAdding && !isEditing && (
            <>
                <Header
                    setIsAdding={setIsAdding}
                />
                <List
                  employees = {employees}
                    handleEdit = {handleEdit}
                    handleDelete = {handleDelete}
                />
            </>
        ) }
        {/*list */}
    {
        isAdding && (

           
            <Add 
                employees ={employees}
                setEmployees = {setEmployees}
                setIsAdding = {setIsAdding }
               
                 />
        )}

        {
            isEditing && (
                <Edit
                    employees ={employees}
                   setSelectedEmployee ={selectedEmployee}
                   setEmployees = {setEmployees}
                    setIsEditing = {setIsEditing }
                     />
            )}
    </div>
  )
}

export default Dashboard