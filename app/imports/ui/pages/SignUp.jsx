import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Employees } from '../../api/employee/Employee';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc, formRef) => {
    const { email, password } = doc;
    // Username should have more than 3 letters and should end with @satlypotatocompany.com
    const pattern = /^[a-z0-9](\.?[a-z0-9]){3,}@[Ss][As][Ll][Tt][Yy][Pp][Oo][Tt][Aa][Tt][Oo][Cc][Oo][Mm][Pp][Aa][Nn][Yy]\.com$/i;
    try {
      const match = pattern.test(email);
      const errorMessage = { code: 403, message: 'Invalid Email Address, email should end with @saltypotatocompany.com domain and must have more than 3 letters' };
      if (!match) throw errorMessage;
      Accounts.createUser({ email, username: email, password }, (err) => {
        if (err) {
          setError(err.reason);
          formRef.reset();
        } else {
          setError('');
          swal('Success', 'Registration Successful', 'success');
          const owner = Meteor.user().username;
          const budget = 0;
          Employees.collection.insert({ owner, budget });
          setRedirectToRef(true);
        }
      });
    } catch (errorMessage) {
      swal('Invalid Email Address', errorMessage.message, 'error');
    }
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to="/"/>;
  }
  let fRef = null;
  return (
    <Container id="signup-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register an Employee</h2>
          </Col>
          <AutoForm ref={ref => { fRef = ref; }}schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="E-mail address"/>
                <TextField name="password" placeholder="Password" type="password"/>
                <ErrorsField/>
                <SubmitField/>
              </Card.Body>
            </Card>
          </AutoForm>
          {/* <Alert variant="secondary">
            Already have an account? Login <Link to="/signin">here</Link>
          </Alert> */}
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.object,
};

export default SignUp;
