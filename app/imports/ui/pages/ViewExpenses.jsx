import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Expenses} from '../../api/expense/Expenses';
// import ListExpenses from '../components/ListExpenses';
import LoadingSpinner from '../components/LoadingSpinner';


/* Renders a table containing all of the Budget documents. Use <BudgetItem> to render each row. */
const ViewExpenses = ({ListExpenses}) => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, expense } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Expenses documents.
    const subscription = Meteor.subscribe(Expenses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Expenses documents
    const expense = Expenses.collection.find({}).fetch();
    return {
      expense,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2 style={{margin: "0.8em"}}>Total Expenses</h2>
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

export default ViewExpenses;
