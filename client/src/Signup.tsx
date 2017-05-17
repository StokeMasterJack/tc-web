import * as React from "react";
import * as Row from "jsxstyle/Row";
import {Card, CardTitle} from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import * as moment from "moment";
import * as validator from "email-validator";
import * as ss from "./util";
import * as t from "./types";

import * as firebase from "firebase/app";
import "firebase/database";
import * as Block from "jsxstyle/Block";
import workshops from "./data/workshops";
import publicEvents from "./data/publicEvents";

const style = {
  padding: "1rem"
};

const inputStyle = {
  width: "100%"
};


interface State extends t.Signup {
  isNew: boolean,
  key: string
}


// interface Props {
//   workshop: Workshop
// }

const initData = (eventId) => ({
  eventId: eventId?eventId:"",
  name: "",
  companyName: "",
  phone: "",
  email: ""
});


const sampleData = () => ({
  eventId: "1",
  name: "Dave Ford",
  companyName: "Smart Soft",
  phone: "714 654 6550",
  email: "dford@smart-soft.com"
});

export default class Signup extends React.Component<any, State> {

  constructor() {
    super();
    this.state = {
      ...initData(1), //todo
      isNew: true,
      key: ""
    };
  }

  componentDidMount() {
    const firstField = document.getElementById("name");
    if (firstField === null) throw Error();
    firstField.focus();
  }

  onSubmit = (event: Event) => {
    event.preventDefault();
    this.setState({isNew: false});
    const ae = this.anyErrors();
    if (!ae) this.submitSignup();
  };

  tEvent = (): t.Event => {
    const eventId = this.props.eventId;
    return publicEvents[eventId];
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

    const eventId = this.props.eventId;

    const database = firebase.database();
    const signupsRef = database.ref("signups");
    const today = moment().format("YYYY-MM-DD");
    const copy = {...this.state, signupDate: today, eventId};
    delete copy.isNew;
    delete copy.key;
    const newSignupRef = signupsRef.push();
    let k = newSignupRef.key;
    if(k === null) throw Error();
    this.setState({key: k});
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
    const event: t.Event = this.tEvent();
    const d1 = moment(event.date);
    const d2 = moment(d1).add(4, "days");
    return d1.format("ddd MMM D") + " - " + d2.format("ddd MMM D");
  };

  anyErrors() {
    const e: t.Signup = this.errors();
    const eValues = Object.values(e);
    return eValues.some(v => !!v);
  }

  errorsUI() {
    if (this.state.isNew) return initData("");
    return this.errors();
  }

  errors(): t.Signup {
    const s: State = this.state;
    const e: t.Signup = initData("");
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

  onSampleDataClick = (event) => {
    event.preventDefault();
    this.setState(sampleData());
  };

  render() {
    const state = this.state;

    if (state.key) {
      ss.spaRedir("/signupRecord/" + state.key);
      return null;
    }

    const errors = this.errorsUI();
    const event: t.Event = this.tEvent();

    const headItemStyle = {
      margin:0,
      padding:0
    };

    return (
      <Row justifyContent="center" paddingTop="1rem">

        <Block width="40rem">
          <CardTitle title="Smart Soft Signup Form" style={{margin: 0, padding: 0, marginBottom: "1rem"}}/>
          <Card style={style}>
            <Block fontSize="1.2rem" marginBottom=".5rem"><b>{workshops[event.workshopKey].title}</b></Block>
            <li style={headItemStyle}>{event.days} Day Hands-on Workshop</li>
            <li style={headItemStyle}>{this.dateRangeFormatted()}</li>
            <li style={headItemStyle}>{ss.formatCurrency(event.price)}</li>
          </Card>
          <Block height="1rem" props={{onClick:this.onSampleDataClick}}>
              &nbsp;
          </Block>
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
