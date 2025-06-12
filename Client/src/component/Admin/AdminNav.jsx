import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminNav() {

  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:20}}>
        <Container>
          <Navbar.Brand href="/">Travistra</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/adminhome">Home</Nav.Link>
              <Nav.Link href="/adminviewusers">User</Nav.Link>
              <NavDropdown title="Package" id="package-drop" menuVariant="dark">
                <NavDropdown.Item href="/adminviewpackage">View</NavDropdown.Item>
                <NavDropdown.Item href="/adminpackage">Add</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Vehicle" id="vehicle-drop" menuVariant="dark">
                <NavDropdown.Item href="/adminviewvehicle">View</NavDropdown.Item>
                <NavDropdown.Item href="/adminvehicle">Add</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/adminviewbooking">Booking</Nav.Link>
              <Nav.Link href="/adminviewpayments">Payment</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
