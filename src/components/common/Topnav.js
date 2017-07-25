import { auth } from '../../firebase';
import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { 
  Navbar, 
  Nav, 
  NavItem,
 } from 'react-bootstrap';

class Topnav extends Component{  
  /* constructor(props){
    super(props);
    this.state = {
      userID: ''
    }      
  } */
  componentWillMount(){
    /* auth.onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          const userID = auth.currentUser.email;
          //console.log(userID);
          this.setState({userID});
        }else{
          this.setState({userID: null});
        }
      }); */
  }
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
                  {/* <NavItem>Settings</NavItem> */}
                   <NavItem>{/* {this.state.userID} */}</NavItem> 
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export { Topnav };
