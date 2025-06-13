import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UserNav() {

  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg" style={{marginBottom:20}}>
        <Container>
          <Navbar.Brand href="/">Travistra</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/userhome">Home</Nav.Link>
              <Nav.Link href="/userprofile">Profile</Nav.Link>
              <Nav.Link href="/userviewpackage">Package</Nav.Link>
              <Nav.Link href="/userbooking">Booking</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
