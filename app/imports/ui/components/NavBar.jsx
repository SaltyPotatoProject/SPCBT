import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (<Navbar.Brand as={NavLink} activeclassname="active" to="/"><h2 style={{ marginLeft: '2em' }}>SPCBT</h2>
        </Navbar.Brand>) : <Navbar.Brand as={NavLink} activeclassname="active" to="/"><h2 style={{ marginLeft: '2em' }}>SPCBT</h2>
        </Navbar.Brand>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {/* {currentUser ? ([
              <Nav.Link as={NavLink} activeclassname="active" exact to="/add" key='add'>Add Stuff</Nav.Link>,
              <Nav.Link as={NavLink} activeclassname="active" exact to="/home" key='home'>HomePage</Nav.Link>,
              <Nav.Link as={NavLink} activeclassname="active" exact to="/list" key='list'>List Stuff</Nav.Link>,
            ]) : ''} */}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (<>
              <Nav.Link as={NavLink} activeclassname="active" to="/signup" key='admin'><label style={{ marginLeft: '12em' }}>Register a User</label> </Nav.Link>
              <Nav.Link as={NavLink} activeclassname="active" to="/allocatebudget" key='allocate'><label style={{ marginLeft: '12em' }}>Allocate Budget</label> </Nav.Link>
            </>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? ''
              : (<NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout"><BoxArrowRight /> Sign
                out</NavDropdown.Item>
              </NavDropdown>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
