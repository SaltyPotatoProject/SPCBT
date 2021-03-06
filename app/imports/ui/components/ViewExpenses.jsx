import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Expenses } from '../../api/expenses/Expenses';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Budget documents. Use <BudgetItem> to render each row. */
const ViewExpenses = ({ ListExpenses }) => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, expense } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Expenses documents.
    const subscription = Roles.userIsInRole(Meteor.userId(), 'admin') ?
      Meteor.subscribe(Expenses.adminPublicationName) : Meteor.subscribe(Expenses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Expenses documents
    const exp = Expenses.collection.find({}).fetch();
    return {
      expense: exp,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2 style={{ margin: '0.8em' }}>Total Expenses</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Owner</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expense.map((bud) => <ListExpenses key={bud._id} expense={bud}/>)}
            </tbody>
          </Table></Col>
      </Row>
    </Container>) : <LoadingSpinner/>);
};
ViewExpenses.propTypes = {
  ListExpenses: PropTypes.func.isRequired,
};

export default ViewExpenses;
