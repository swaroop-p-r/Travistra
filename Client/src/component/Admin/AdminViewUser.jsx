import React from 'react'
import AXIOS from 'axios'
import AdminNav from './AdminNav'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { useEffect } from 'react'

export default function AdminViewUser() {
    const [user,setUser] = useState([])

    const fetchUser = () => {
        AXIOS.get("http://localhost:4000/api/admin/viewusers")
        .then((res)=>{
            setUser(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchUser()
    },[])

    const adminToggleUserStatus= (id)=>{
        // console.log("For status:",id)
        AXIOS.patch("http://localhost:4000/api/admin/userstatus",
            {},// 2nd parameter for  body 
            {
                headers:{userid:id}
            })
        .then((res)=>{
            alert(res.data.msg)
            fetchUser()
        }).catch((err)=>{
            console.log("frontend catch",err)
        })
    }

    const deleteUser = (id) =>{
        console.log("deleteduserid:",id)
        AXIOS.delete("http://localhost:4000/api/admin/deleteuser",{headers:{userid:id}})
        .then((res)=>{
            alert(res.data.msg)
            fetchUser()
        }).catch((err)=>{
            console.log(err)
        })
    }


  return (
    <>
    <AdminNav/>
    <h1 style={{padding:10}}>Users</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td><Button style={{width:130}} variant={item.status?"success":"warning"} onClick={()=> adminToggleUserStatus(item._id)}>{item.status?"Activated":"Deactivated"}</Button></td>
                                <td><Button variant="danger" onClick={() => deleteUser(item._id)}>Delete</Button></td>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
    </>
  )
}
