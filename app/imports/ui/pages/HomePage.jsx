import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Budget } from '../../api/budget/Budget';
import ViewExpenses from './ViewExpenses';
import ListExpenses from '../components/ListExpenses';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  amount: Number,
});


const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Homepage page for adding a document. */
const Homepage = () => {
    // console.log(Meteor.user().username)

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, amount} = data;
    const budget = 100;
    const owner = Meteor.user().username;
    Budget.collection.insert(
      { name, owner, amount, budget},
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
//    let owner = Meteor.user().username;
  return (
    <Container>
        {/* { <h5>Hello {owner} </h5>} */}
        <ViewExpenses ListExpenses={ListExpenses} />
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2 style={{margin: "0.8em"}}>Add Expenses</h2></Col>
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
    </Container>
  );
};

export default Homepage;
