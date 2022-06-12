import React from 'react';
import { Meteor } from 'meteor/meteor';
// import { Col } from 'react-bootstrap';
import { Navigate } from 'react-router';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    // // <div>
    // {/* <Col id="signout-page" className="text-center"><h2>You are signed out.</h2></Col> */}
    // <Navigate to= "/signin" />
    // {/* </div> */}
    <Navigate to="/" />

  );
};

export default SignOut;
