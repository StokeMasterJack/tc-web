import React, { Component } from "react";
import Block from "jsxstyle/Block";
import Row from "jsxstyle/Row";
import { CardTitle } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";

import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyD7V3jY16HarLDDVv1zMglUdrGbrgvUpC8",
  authDomain: "tc-web-3362e.firebaseapp.com",
  databaseURL: "https://tc-web-3362e.firebaseio.com",
  projectId: "tc-web-3362e",
  storageBucket: "tc-web-3362e.appspot.com",
  messagingSenderId: "477164933504"
};
firebase.initializeApp(config);

const style = {
  width: "40rem",
  padding: "1rem",
  margin: "1rem",
  border: "solid black 1px"
};

const inputStyle = {
  width: "100%"
};

export default class CustForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      workshop: "React",
      love: "",
      hate: "",
      isNew: true,
      done: false
    };
  }

  componentDidMount() {
    const nameField = document.getElementById("evalName");
    nameField.focus();
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

  ch = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    const s = this.state;

    if (s.done) {
      return (
        <Block>
          <CardTitle title="Thank You" />
        </Block>
      );
    }

    return (
      <Row justifyContent="center">
        <div style={style}>
          <CardTitle title="Post Class Evaluation" />
          <form autoComplete="off">
            <TextField
              id="evalName"
              name="name"
              style={inputStyle}
              floatingLabelText="Your name (optional)"
              value={s.name}
              onChange={this.ch}
            />

            <TextField
              name="workshop"
              style={inputStyle}
              hintText="Workshop"
              floatingLabelText="Workshop"
              value={s.workshop}
              onChange={this.ch}
            />
            <TextField
              name="love"
              style={inputStyle}
              floatingLabelText="What did you like most about workshop? (optional)"
              value={s.love}
              onChange={this.ch}
              multiLine={true}
              rows={3}
            />

            <TextField
              name="hate"
              style={inputStyle}
              floatingLabelText="What did you like least about workshop? (optional)"
              value={s.hate}
              onChange={this.ch}
              multiLine={true}
              rows={3}
            />
            <FlatButton
              label="Submit"
              style={{ width: "100%" }}
              onClick={this.onSubmit}
            />

          </form>
        </div>
      </Row>
    );
  }
}
