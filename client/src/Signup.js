import React, { Component } from "react";
import Block from "jsxstyle/Block";
import Row from "jsxstyle/Row";
import { Card, CardTitle } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import validator from "email-validator";

import firebase from "firebase/app";
import "firebase/database";

const style = {
  width: "40rem",
  margin: "1rem"
};

const inputStyle = {
  width: "100%"
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      companyName: "",
      phone: "",
      email: "",
      robot: "",
      isNew: true,
      done: false
    };
  }

  componentDidMount() {
    const firstField = document.getElementById("firstName");
    firstField.focus();
  }

  onSubmit = ev => {
    const s = this.state;
    ev.preventDefault();
    this.setState({ isNew: false });
    const database = firebase.database();
    const evalsRef = database.ref("evals");
    console.log("evalsRef", evalsRef);

    var newEvalRef = evalsRef.push();
    newEvalRef
      .set({
        date: moment().format("YYYY-MM-DD"),
        name: s.name,
        workshop: s.workshop,
        love: s.love,
        hate: s.hate
      })
      .then(response => this.setState({ done: true }));
  };

  onSubmit = ev => {
    const s = this.state;
    ev.preventDefault();
    this.setState({ isNew: false });
    const database = firebase.database();
    const signupsRef = database.ref("signups");
    console.log("signupsRef", signupsRef);

    const today = moment().format("YYYY-MM-DD");
    const copy = { ...this.state, date: today };
    delete copy.isNew;
    delete copy.done;

    var newSignupRef = signupsRef.push();
    newSignupRef.set(copy).then(response => this.setState({ done: true }));
  };

  ch = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  errors() {
    const s = this.state;
    const e = {
      firstName: "",
      lastName: "",
      companyName: "",
      phone: "",
      email: "",
      robot: ""
    };
    if (this.state.isNew) {
      return e;
    }
    if (!s.firstName) e.name = "Enter your First Name";
    if (!s.lastName) e.name = "Enter your  Last Name";
    if (!s.companyName) e.name = "Enter your Company Name";
    if (!s.email) {
      e.email = "Enter your email";
    } else if (!validator.validate(s.email)) {
      e.email = "Enter a valid email address";
    }
    return e;
  }

  render() {
    const s = this.state;

    if (s.done) {
      return (
        <Block>
          <CardTitle title="Thank You" />
        </Block>
      );
    }

    const errors = this.errors();

    return (
      <Row justifyContent="center" paddingTop="2rem">
        <Card>
          <CardTitle title="Smart Soft Signup Form" />
          <form autoComplete="off" style={style}>
            <TextField
              id="firstName"
              name="firstName"
              style={inputStyle}
              floatingLabelText="First name"
              value={s.firstName}
              onChange={this.ch}
              errorText={errors.firstName}
            />

            <TextField
              name="lastName"
              style={inputStyle}
              floatingLabelText="Last name"
              value={s.inputStyle}
              onChange={this.ch}
              errorText={errors.lastName}
            />
            <TextField
              name="companyName"
              style={inputStyle}
              floatingLabelText="Company name"
              value={s.inputStyle}
              onChange={this.ch}
              errorText={errors.companyName}
            />

            <TextField
              name="phone"
              style={inputStyle}
              floatingLabelText="Phone"
              value={s.phone}
              onChange={this.ch}
            />

            <TextField
              name="email"
              style={inputStyle}
              floatingLabelText="Email"
              value={s.email}
              onChange={this.ch}
            />

            <FlatButton
              label="Submit"
              style={{ width: "100%" }}
              onClick={this.onSubmit}
            />

          </form>
        </Card>
      </Row>
    );
  }
}
