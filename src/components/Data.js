import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import UsersData from './services/UsersData';
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
const Data = () => {
    const Navigate = useNavigate();
    const [users , setUsers]=useState([])

    const setUserData = () =>{
        UsersData.GetData().then((response) =>{
            setUsers(response.data)
            console.log(response.data)
        }).catch(error =>{
            console.log("error occur"+error)
        })
    }
   useEffect(()=>{
    setUserData();

    },[])

    const RemoveUser = (id) =>{
       
        UsersData.DeleteData(id).then((response) =>{
            alert("succesfully deleted")
            setUserData()
        }).catch(error =>{
            console.log("error = "+ error)
        })

    }
  

  return (
    <div className='body'>
        <NavBar />
        <Table striped bordered hover className='table-striped table-hover' >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>qualification</th>
                    <th>Address</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>
                {
                    // students &&
                    users.map((user, index) => (
                        <tr key={user.id}>

                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone} </td>
                            <td>{user.qualification} </td>
                            <td>{user.address} </td>


                            <td>
                                <button className="button_style" onClick={() => Navigate("/editform/"+ user.id)}> <FaEdit />  </button>


                                <button
                                    onClick={() => RemoveUser(user.id)} className="button_style"
                                >
                                    <FaTrash />
                                </button>

                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </div>
  )
}

export default Data
