import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { renderInput } from '../../../components/form';
import { registerFormValidate } from '../../../helpers/validates';

const REGISTER_MUTATION = gql`
  mutation RegisterMutation($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const Register = ({ submitting, loading, handleSubmit }) => (
  <div className="app flex-row align-items-center">
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="mx-4">
            <CardBody className="p-4">
              <h1>Register</h1>
              <p className="text-muted">Create your account</p>
              <Field name="email" type="email" label="Email" component={renderInput} />
              <Field name="username" type="text" label="Username" component={renderInput} />
              <Field name="password" type="password" label="Password" component={renderInput} />
              <Field name="confirmPassword" type="password" label="Confirm Password" component={renderInput} />
              <div className="d-flex justify-content-between align-items-center">
                <Button color="success" disabled={submitting || loading} onClick={handleSubmit}>Create Account</Button>
                <Link to="/login" disabled={submitting || loading}>Already have an account?</Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

const registerForm = reduxForm({
  form: 'registerForm',
  onSubmit: async (values, dispatch, props) => {
    props.registerStart();
    try {
      const data = await props.mutate({
        variables: values,
      });
      props.registerSuccess(data);
    } catch(error) {
      props.registerError(error);
    };
  },
  validate: registerFormValidate,
})(Register);

export default graphql(REGISTER_MUTATION)(registerForm);
