// @flow
import React, {Component} from "react";
import SignupRecord from "./SignupRecord";
import Row from "jsxstyle/Row";
import {Card, CardTitle} from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import validator from "email-validator";
import * as ss from "./util";
import * as t from "./types";

import firebase from "firebase/app";
import "firebase/database";
import Block from "jsxstyle/Block";
import workshops from "./workshops.json";

const style = {
  padding: "1rem"
};

const inputStyle = {
  width: "100%"
};

interface Data {
  name: string,
  companyName: string,
  phone: string,
  email: string
}

interface State extends Data {
  isNew: boolean,
  key: string
}


// interface Props {
//   workshop: Workshop
// }

const initData = () => ({
  name: "",
  companyName: "",
  phone: "",
  email: ""
});


const sampleData = () => ({
  name: "Dave Ford",
  companyName: "Smart Soft",
  phone: "714 654 6550",
  email: "dford@smart-soft.com"
});

export default class Signup extends Component {
  state: State;
  // props: Props;

  constructor() {
    super();
    this.state = {
      ...initData(),
      isNew: true,
      key: ""
    };
  }

  componentDidMount() {
    const firstField = document.getElementById("name");
    if (firstField === null) throw Error();
    firstField.focus();


    const event: t.Event = {
      workshopKey: "react",
      date: "2017-01-01",
      days: 5,
      price: 3200
    };


  }

  onSubmit = (event: Event) => {
    event.preventDefault();
    this.setState({isNew: false});
    const ae = this.anyErrors();
    if (!ae) this.submitSignup();
  };

  tEvent = (): t.Event => {
    const params = new URLSearchParams(window.location.search);
    return {
      workshopKey: params.get("workshopKey"),
      date: params.get("date"),
      days: params.get("days"),
      price: params.get("price")
    }
  };

  /*
   eventDate: "2017-01-01"
   workshopKey: "react"
   signupDate: "2017-01-01"
   firstName:
   lastName:
   companyName:
   phone:
   email:
   */
  submitSignup = () => {

    const event:t.Event = this.tEvent();

    const database = firebase.database();
    const signupsRef = database.ref("signups");
    const today = moment().format("YYYY-MM-DD");
    const copy = {...this.state, signupDate: today, eventDate: event.date, workshopKey: event.workshopKey};
    delete copy.isNew;
    delete copy.key;
    const newSignupRef = signupsRef.push();
    console.log("newSignupRef: ", newSignupRef.key);
    this.setState({key: newSignupRef.key});
    //newSignupRef.on("value", v => console.log("v: ", v));
    newSignupRef.set(copy);
  };

  ch = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  dateRangeFormatted = () => {
    const event:t.Event = this.tEvent();
    const d1 = moment(event.date);
    const d2 = moment(d1).add(4, 'days');
    return d1.format("ddd MMM D") + " - " + d2.format("ddd MMM D");
  };

  anyErrors() {
    const e: Data = this.errors();
    const eValues = Object.values(e);
    console.log("e", e);
    return eValues.some(v => !!v);
  }

  errorsUI() {
    if (this.state.isNew) return initData();
    return this.errors();
  }

  errors(): Data {
    const s: State = this.state;
    const e: Data = initData();
    if (!s.name) e.name = "Enter your Name";
    if (!s.companyName) e.companyName = "Enter your Company Name";
    if (!s.phone) {
      e.phone = "Enter your Phone Number";
    } else if (!ss.isValidPhoneNumber(s.phone)) {
      e.phone = "Enter a valid Phone Number";
    }
    if (!s.email) {
      e.email = "Enter your email";
    } else if (!validator.validate(s.email)) {
      e.email = "Enter a valid email address";
    }
    return e;
  }

  render() {
    const state = this.state;

    if (state.key) {
      ss.spaRedir("signupRecord/"+state.key);
      return null;
    }

    const errors = this.errorsUI();

    const event:t.Event = this.tEvent();

    return (
      <Row justifyContent="center" paddingTop="1rem">
        <Block width="40rem">
          <Card style={style}>
            <CardTitle title="Smart Soft Signup Form" style={{margin: 0, padding: 0, marginBottom: '1rem'}}/>
            <Block fontSize="1.2rem">{workshops[event.workshopKey]}</Block>
            <Block>{event.days} Day Hands-on Workshop</Block>
            <Block>{this.dateRangeFormatted()}</Block>
            <Block>{ss.formatCurrency(event.price)}</Block>
          </Card>
          <button onClick={(event: Event) => {
            event.preventDefault();
            this.setState(sampleData())
          }}>Sample Data
          </button>
          <Card style={style}>
            <form autoComplete="off">
              <TextField
                id="name"
                name="name"
                style={inputStyle}
                floatingLabelText="Name"
                value={state.name}
                onChange={this.ch}
                errorText={errors.name}
              />
              <TextField
                name="companyName"
                style={inputStyle}
                floatingLabelText="Company name"
                value={state.companyName}
                onChange={this.ch}
                errorText={errors.companyName}
              />

              <TextField
                name="phone"
                style={inputStyle}
                floatingLabelText="Phone"
                value={state.phone}
                onChange={this.ch}
                errorText={errors.phone}
              />

              <TextField
                name="email"
                style={inputStyle}
                floatingLabelText="Email"
                value={state.email}
                onChange={this.ch}
                errorText={errors.email}
              />

              <FlatButton
                label="Submit"
                style={{width: "100%"}}
                onClick={this.onSubmit}
              />

            </form>
          </Card>
        </Block>
      </Row>
    );
  }
}
