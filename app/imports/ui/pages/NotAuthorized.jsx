import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotAuthorized = () => (
  <Container>
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <h2>
          <p>Not Authotized</p>
          {/* <h3>Please sign in again</h3> */}
        </h2>
        <h3>Please sign in again</h3>
      </Col>
    </Row>
  </Container>
);

export default NotAuthorized;
