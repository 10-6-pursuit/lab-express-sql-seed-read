import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/songs">Tuner</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/songs">Songs</Nav.Link>
        <Nav.Link as={Link} to="/songs/new">New Song</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
