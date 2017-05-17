import * as React from "react";
import * as Block from "jsxstyle/Block";
import * as Row from "jsxstyle/Row";
import * as t from "./types";
import * as firebase from "firebase/app";
import publicEvents from "./data/publicEvents";
import workshops from "./data/workshops";

const h2Style = {marginBottom: ".5rem", marginTop: "1rem"};

interface Props {
  id: string
}
type State = t.Signup | null;

export default class SignupRecord extends React.Component<Props, State> {

  props: Props;
  state: State;
  mounted: boolean;

  constructor(props: Props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {
    this.mounted = true;
    this.fetchSignupRecord();
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    if (this.state === null) return <div>Loading...</div>;
    const s: t.Signup = this.state;

    const eventId: string = s.eventId;
    const event: t.Event = publicEvents[eventId];
    if (!event) throw Error();

    const workshop: t.Workshop = workshops[event.workshopKey];

    const d1 = t.eventStartDate(event, "ddd MMM D");
    const d2 = t.eventEndDate(event, "ddd MMM D");

    return (
      <Block padding="1rem">
        <h1>Signup Confirmation</h1>

        <Block marginTop="1rem">Thank you. You are now registered. Below is your registration record.</Block>

        <Block marginTop="1rem" marginBottom="1rem" fontStyle="italic ">Note: your seat is not guaranteed until payment
          is received.
          We accept payment by <a href="#payByCheck">check</a> or <a href="#payByCreditCard">credit card</a>.</Block>

        {this.field("Registration ID", s.id)}
        {this.field("Workshop", workshop.title)}
        {this.field("Days", event.days)}
        {this.field("Start Date", d1)}
        {this.field("End Date", d2)}
        {this.field("Email", s.email)}
        {this.field("Company", s.companyName)}
        {this.field("Price", "$" + String(event.price))}

        <Block marginTop="1rem">You should receive a confirmation email soon.</Block>

        <a id="payByCheck" name="payByCheck"/>
        <Block>
          <h2 style={h2Style}>Pay by Check</h2>
          <Block marginBottom=".5rem">Please mail check to:</Block>

          <i>
          Smart Soft Training Inc.<br/>
          14 Via Alonso<br/>
          San Clemente, CA 92673<br/>
          </i>

          <Block marginTop="1rem">Make check payable to <b>Smart Soft Training Inc.</b></Block>

        </Block>


        <a id="payByCreditCard" name="payByCreditCard"/>
        <Block>
          <h2 style={h2Style}>Pay by Credit Card</h2>
          Please <a href="/contact">call</a> to make a
          credit card payment by phone.
        </Block>

      </Block>
    );
  }

  field = (label, data) => (
    <Row>
      <Block width="10rem" padding=".3rem" margin=".3rem" background="#DDDDDD" color="black" textAlign="right"
             fontStyle="italic">{label}:</Block>
      <Block width="30rem" padding=".3rem" margin=".3rem" >{data}</Block>
    </Row>
  );

  fetchSignupRecord() {
    const id = this.props.id;
    const database = firebase.database();
    const signupRef = database.ref("signups/" + id);
    signupRef.on("value", snapshot => {
      if (snapshot === null) throw Error();
      const signup = snapshot.val();
      signup.id = id;
      this.setState(signup);
    });
  }
}

