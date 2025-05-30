import React, { useState } from 'react'
import AXIOS from 'axios'
import { useNavigate } from 'react-router-dom';
import HomeNav from './Home/homeNav';

export default function Login() {
    const [record, setRecord] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setRecord({ ...record, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        AXIOS.post("http://localhost:4000/api/user/login", record)
            .then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("token", res.data.token)
                    if (res.data.role === "admin") {
                        alert(res.data.msg)
                        // console.log("role :",res.data.role)
                        navigate('/adminhome')
                    } else if (res.data.role === "user") {
                        alert(res.data.msg)
                        // console.log("role :",res.data.role)
                        navigate('/userhome')
                    } else {
                        alert("Role Based Error")
                    }
                    
                } else {
                    alert(res.data.msg);
                }
            }).catch((err) => {
                console.log(err)
                alert("user Login Failed")
            })
    }

    return (
        <>
        <HomeNav />
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <p><input type="email" name="email" placeholder="Enter email" onChange={handleChange} /></p>
                <p><input type="password" name="password" placeholder="Enter password" onChange={handleChange} /></p>
                <p><input type="submit" value={"Login"} /></p>
                <p>New user, <a href="/register">register here?</a></p>
            </form>
        </>
    )
}
