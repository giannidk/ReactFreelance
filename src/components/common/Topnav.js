import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { 
  Navbar, 
  Nav, 
  NavItem,
 } from 'react-bootstrap';

class Topnav extends Component{
    render() {
        return (
            <Navbar inverse collapseOnSelect fixedTop>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">React Freelance</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <LinkContainer to="/dashboard">
                    <NavItem eventKey={1}>
                       Dashboard                  
                    </NavItem>
                  </LinkContainer>
                  
                  <LinkContainer to="/clients">
                    <NavItem eventKey={2}>
                       Clients                  
                    </NavItem>
                  </LinkContainer>
                  
                  <LinkContainer to="/projects">
                    <NavItem eventKey={2} >
                       Projects                  
                    </NavItem>
                  </LinkContainer>
                  
                  <LinkContainer to="/registrations">
                    <NavItem eventKey={1} >
                       Registrations                  
                    </NavItem>
                  </LinkContainer>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={2} href="#">Settings</NavItem>
                  <NavItem eventKey={1} href="#">Log out (admin)</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export { Topnav };