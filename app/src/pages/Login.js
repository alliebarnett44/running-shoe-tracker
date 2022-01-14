import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { withRouter } from 'react-router-dom';
  
function validateForm() {
  return this.state.email.length > 0 && this.state.password.length > 0;
}

function handleSubmit(event) {
  if (this.state.email == "allie.barnett44@gmail.com" && this.state.password == "app") {
    this.props.history.push({
      pathname: '/home',
      email: this.state.email
    })
  } else {
    alert("Incorrect email/password biatch");
  }
}

function setEmail(email) {
  this.state.email = email;
}

function setPassword(password) {
  this.state.password = password;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      runnerRecord: {},
      email: "",
      password: ""
    };
  }


  render() {
    return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={this.state.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={this.state.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
    }
}

export default withRouter(Login);