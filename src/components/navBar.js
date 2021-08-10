import React, { useContext, useState } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import Login from "./login";
import { Authcontext } from "../context/auth-context";
import SimpleMenu from './navMenu'


const NavBar = () => {
    const auth=useContext(Authcontext)
    const logout =()=>{
        auth.logout()
    }
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>

        {!auth.token &&<Login />}
        {auth.token && <SimpleMenu/>}
      </Navbar>
    </div>
  );
};

export default NavBar;
