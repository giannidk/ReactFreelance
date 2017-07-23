import firebase from 'firebase';
import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { 
  Navbar, 
  Nav, 
  NavItem,
 } from 'react-bootstrap';
import { connect } from 'react-redux';  
import { logoutUser } from '../../actions';

class Topnav extends Component{
  renderUser(){
      const { currentUser } = firebase.auth();
      console.log(this.props);
      if(currentUser){
        return (<NavItem >Log out {currentUser.uid}</NavItem>);
      }
      return (
          <LinkContainer to="/">
            <NavItem>Login</NavItem>
          </LinkContainer>
      );
  }
    render() {
        return (
            <Navbar inverse collapseOnSelect fixedTop>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">React Freelance</Link>                  
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <LinkContainer to="/dashboard">
                    <NavItem>Dashboard</NavItem>
                  </LinkContainer>
                  
                  <LinkContainer to="/clients">
                    <NavItem>Clients</NavItem>
                  </LinkContainer>
                  
                  <LinkContainer to="/projects">
                    <NavItem>Projects</NavItem>
                  </LinkContainer>
                  
                  <LinkContainer to="/registrations">
                    <NavItem>Registrations</NavItem>
                  </LinkContainer>
                  
                  <LinkContainer to="/invoices">
                    <NavItem>Invoices</NavItem>
                  </LinkContainer>
                </Nav>
                <Nav pullRight>                  
                   {this.renderUser()} 
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default connect(null, {logoutUser})(Topnav) ;
export { Topnav };
