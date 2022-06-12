import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Expenses } from '../../api/expense/Expenses';
import ViewExpenses from './ViewExpenses';
import ListExpenses from '../components/ListExpenses';
import { Employees } from '../../api/employee/Employee';
// import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  amount: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Homepage page for adding a document. */
const Homepage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, employee } = useTracker(() => {
  // Note that this subscription will get cleaned up
  // when your component is unmounted or deps change.
  // Get access to Budget documents.
    const subscription = Meteor.subscribe(Employees.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Budget documents

    const transaction = Employees.collection.find({ owner: Meteor.user().username }).fetch();
    return {
      employee: transaction,
      ready: rdy,
    };
  }, []);
  
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, amount } = data;
    const owner = Meteor.user().username;
    if (employee[0].budget < amount) {
      swal('Error', 'Not Enough Budget', 'error');
    } else {
      Expenses.collection.insert(
        { name, owner, amount },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            Employees.collection.update({ _id: employee[0]._id }, { $set: { budget: employee[0].budget - amount } });
            formRef.reset();
          }
        },
      );
    }
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (ready ? (
    <Container>
      { <h3 style={{ marginLeft: '12em' }}>Hello {employee[0].owner}, You have ${employee[0].budget} remaining to spend </h3>}
      <ViewExpenses ListExpenses={ListExpenses} />
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2 style={{ margin: '0.8em' }}>Add Expenses</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name='name'/>
                <NumField name= 'amount' decimal={null}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>) : <LoadingSpinner/>
  );
};

export default Homepage;
