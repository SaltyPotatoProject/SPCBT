import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Budget} from '../../api/budget/Budget';
// import ListExpenses from '../components/ListExpenses';
import LoadingSpinner from '../components/LoadingSpinner';


/* Renders a table containing all of the Budget documents. Use <BudgetItem> to render each row. */
const ViewExpenses = ({ListExpenses}) => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, budget } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Budget documents.
    const subscription = Meteor.subscribe(Budget.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Budget documents
    const transaction = Budget.collection.find({}).fetch();
    return {
      budget: transaction,
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
              {budget.map((bud) => <ListExpenses key={bud._id} budget={bud}/>)}
            </tbody>
          </Table></Col>
      </Row>
    </Container>) : <LoadingSpinner/>);
};

export default ViewExpenses;
