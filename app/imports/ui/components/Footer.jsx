import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className='footer mt-auto py-3 bg-light text-bg-light'>
    <Container>
      <Col className="text-center">
        SPCBT TEAM <br />
        &copy; SPCBT 2022, No rights reserved
      </Col>
    </Container>
  </footer>
);

export default Footer;
