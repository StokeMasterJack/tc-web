import React, { Component } from "react";
import Block from "jsxstyle/Block";
import Row from "jsxstyle/Row";
import Col from "jsxstyle/Col";
import WorkshopDetail from "./WorkshopDetail";
import Testimonials from "./Testimonials";
import logo from "./ss-logo-transparent.png";
import { Card, CardTitle, CardText, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

const workshopDetailStyle = {
  margin: "1rem",
  textAlign: "center",
  padding: "1rem",
  width: "70%"
};

export default class HomePage extends Component {
  render() {
    return (
      <Block paddingTop="2rem">
        {this.header()}
        {this.boxes()}
        {this.workshopDetail()}
        {this.testimonials()}
      </Block>
    );
  }

  header = () => (
    <Block>
      <Row
        color="rgba(255, 255, 255, 0.541176)"
        justifyContent="center"
        alignItems="center"
      >
        <img src={logo} alt="Smart Soft - Developer Training" />
      </Row>
      <Row
        justifyContent="center"
        fontSize="2rem"
        alignItems="center"
        paddingTop="3.2rem"
      >
        Instructor-led React Training
      </Row>
    </Block>
  );

  boxStyle = {
    width: "19rem",
    margin: "1rem",
    textAlign: "center",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  boxes = () => (
    <Row
      justifyContent="center"
      alignItems="stretch"
      paddingTop="3rem"
      paddingLeft="1rem"
      paddingRight="1rem"
    >
      <Card style={this.boxStyle}>
        <Block>
          <CardTitle
            title="Public Workshops"
            style={{ marginBottom: ".5rem", padding: 0 }}
          />
          <CardText style={{ margin: 0, padding: 0 }}>
            <Block>
              Open-enrollment workshops at our training center in San Clemente, California.
            </Block>
            <Block marginTop="1rem">Max class size: 4 students.</Block>
          </CardText>
        </Block>
        {/*<CardActions>
          <FlatButton label="Schedule" onClick={() => alert("Todo")} />
        </CardActions>*/}
      </Card>

      <Card style={this.boxStyle}>
        <Block>
          <CardTitle
            title="Private Workshops"
            style={{ marginBottom: ".5rem", padding: 0 }}
          />
          <CardText style={{ margin: 0, padding: 0 }}>
            <Block>
              Schedule an on-site workshop at your company's location.
            </Block>
            <Block marginTop="1rem">Max class size: 10 students.</Block>

          </CardText>
        </Block>
        {/*<CardActions>
          <FlatButton label="More Inforation" onClick={() => alert("Todo")} />
        </CardActions>*/}
      </Card>
    </Row>
  );

  workshopDetail = () => (
    <Row justifyContent="center" marginTop="2rem">
      <Card style={workshopDetailStyle}>
        <WorkshopDetail />
      </Card>
    </Row>
  );

  testimonials = () => (
    <Row justifyContent="center" marginTop="2rem">
      <Card style={workshopDetailStyle}>
        <Testimonials />
      </Card>
    </Row>
  );
}
