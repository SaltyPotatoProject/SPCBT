import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../../api/employee/Employee';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  owner: String,
  amount: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AllocateBudget page for adding a document. */
const AllocateBudget = () => {
  const { ready, employee } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Budget documents.
    const subscription = Meteor.subscribe(Employees.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Budget documents
    const emp = Employees.collection.find({}).fetch().map(employeee => [employeee.owner, employeee._id]);
    return {
      employee: emp,
      ready: rdy,
    };
  }, []);
  const owners = employee.map(emp => emp[0]);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { owner, amount } = data;
    const _id = employee.find(emp => emp[0] === owner)[1];
    const [{ budget }] = Employees.collection.find({ _id });
    const amt = budget + amount;
    Employees.collection.update(
      { _id },
      { $set: { budget: amt } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Budget allocated successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    ready ?
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Allocate Budget for Employees</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <SelectField name='owner' allowedValues={owners}/>
                  <NumField name='amount' decimal={null}/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
      : <LoadingSpinner />
  );
};

export default AllocateBudget;
