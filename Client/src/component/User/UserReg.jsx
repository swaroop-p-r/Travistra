import React, { useState } from 'react';
import AXIOS from 'axios';
import HomeNav from '../Home/homeNav';
import { useNavigate } from 'react-router-dom';

export default function UserReg() {

  const [record, setRecord] = useState({
    username: "",
    address: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value })
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(record)
    AXIOS.post("http://localhost:4000/api/user/register", record)
      .then((res) => {
        console.log(res.data)
        alert(res.data.msg)
        if (res.data.status === 200) {
          navigate('/login')
        }
      }).catch((err) => {
        console.log(err)
          alert("Registration failed");
      })
  }

  return (
    <>
      <HomeNav />
      <div className="container mt-4">
        <h2>Register Page</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <input
              type="text"
              name="username"
              placeholder="Enter name"
              onChange={handleChange}
              required
              pattern="[A-Za-z\s]+"
            />
          </p>
          <p>
            <textarea
              name="address"
              placeholder="Enter address"
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
              pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={record.password}
              onChange={handleChange}
              required
              pattern="[A-Za-z0-9@]{6,}"
            />
          </p>
          <p>
            <input type="submit" value="Register" />
          </p>
          <p>Already have an account? <a href="/login">login here?</a></p>
        </form>
      </div>
    </>
  );
}