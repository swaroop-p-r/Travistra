import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export default function UserNav() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:60}}>
        <Container>
          <Navbar.Brand href="/">Travistra</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/viewProfile">Profile</Nav.Link>
              <Nav.Link href="/viewpackage">Package</Nav.Link>
              <Nav.Link href="/booking">Booking</Nav.Link>
              <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
