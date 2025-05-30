import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function AdminNav() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:20}}>
        <Container>
          <Navbar.Brand href="/">Travistra</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
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
              <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
