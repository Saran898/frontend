import React, { useRef, useState } from "react";
import './CRUD.css';

export const CRUD = () => {

    const list = [
    {
        id: 1,
        name: "Dell",
        price: "2222"
    },
    {
        id: 2,
        name: "Bell",
        price: "6666"
    },
    {
        id: 3,
        name: "Rell",
        price: "9999"
    },
    {
        id: 4,
        name: "Cell",
        price: "99"
    }
]

    const [lists, setList] = useState(list)
    const [updateState, setUpdateState] = useState(-1)

    return (

        
        <div className="crud">
            <div>
            <AddList  setList={setList}/>
            <form onSubmit={handleSubmit}>
            <table>
                {
                    lists.map((current) => (
                        updateState === current.id ? <EditList current={current} lists={lists} setList={setList}/> :
                        <tr>
                           {/* <td>{current.id}</td> */}
                            <td>{current.name}</td>
                            <td>{current.price}</td>
                            <td> <button className="edit" onClick={() => handleEdit(current.id)}>Edit</button>
                                 <button className="delete" type="button" onClick={() => handleDelete(current.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
            </form>
            </div>
        </div>
    
    )


    function handleEdit (id) {
        setUpdateState(id);
    }


    function handleDelete (id) {
        const newlist = lists.filter((li) => li.id !== id)
        setList(newlist);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = event.target.elements.price.value;
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, name:name, price:price} : li
        ))
        setList(newlist)
        setUpdateState(-1)
    }
}





let EditList = ({current, lists, setList}) => {
    function handInput1(event) {
        const name = event.target.name;
        const value = event.target.value;

        //const value = name.value;
        //const value2 = name.value;


        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, name:value} : li
        ))
        setList(newlist);
    }
    function handInput2(event) {
        //const name = event.target.name;
        const value = event.target.value;
        //const price = event.target.price;

        //const value1 = name.value;
        //const value2 = name.value;


        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, price:value} : li
        ))
        setList(newlist);
    }
    return(
        <tr>
            <td><input type="text" onChange={handInput1} name="name" value={current.name}/></td>
            <td><input type="text" onChange={handInput2} name="price" value={current.price}/></td>
            <td><button type="submit">Update</button></td>
        </tr>
    )
}

function AddList({setList}) {
    const nameRef = useRef();
    const priceRef = useRef();
    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = event.target.elements.price.value;
        const newList = {
            id:3,
            name,
            price
        }
        setList((prevlist) => {
            return prevlist.concat(newList)
        })
        nameRef.current.value="";
        priceRef.current.value="";
    }
    return(
        <form  className="addForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Name" name="name" ref={nameRef}/>
            <input type="text" placeholder="Enter Price" name="price" ref={priceRef}/>
            <button type="submit">Add To List</button>
        </form>
    )
}


//export default CRUD;