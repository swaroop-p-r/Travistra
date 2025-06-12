import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const HomeNav = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:20}}>
        <Container>
          <Navbar.Brand href="/">Travistra</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/register">User Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeNav;