import React, { Component } from 'react';
import { 
  Navbar, 
  Nav, 
  NavItem, 
  NavDropdown, 
  MenuItem,
  FormGroup,
  FormControl,
  Button
 } from 'react-bootstrap';

class NavigationTop extends Component{
    render() {
        return (
            <Navbar inverse collapseOnSelect fixedTop>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">React Freelance</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} href="#">Dashboard</NavItem>
                  <NavItem eventKey={1} href="#">Clients</NavItem>
                  <NavItem eventKey={2} href="#">Projects</NavItem>
                  <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>

                  <Navbar.Form pullLeft>
                    <FormGroup>
                      <FormControl type="text" placeholder="Search" />
                    </FormGroup>
                    {' '}
                    <Button type="submit">Submit</Button>
                </Navbar.Form>


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

export default NavigationTop;