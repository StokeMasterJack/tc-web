import React, { Component } from "react";
import Block from "jsxstyle/Block";
import Row from "jsxstyle/Row";
import logo from "./ss-logo-transparent.png";
import { Card, CardTitle, CardText, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

const style = {
  width: "20rem",
  margin: "1rem",
  textAlign: "center",
  padding: "1rem"
};

export default class HomePage extends Component {
  render() {
    return (
      <Block paddingTop="2rem">
        <Row
          color="rgba(255, 255, 255, 0.541176)"
          justifyContent="center"
          alignItems="center"
        >
          <img src={logo} alt="Smart Soft - Developer Training" />
        </Row>
        <Row justifyContent="center" alignItems="center" paddingTop="3rem">
          <Block textAlign="center">
            <Block fontSize="2rem" marginBottom="1rem">Instructor-led React Training</Block>
            <Block fontSize="1.5rem">Five day hands-on workshop</Block>
          </Block>
        </Row>

        <Row justifyContent="center" alignItems="stretch" paddingTop="3rem">
          <Card style={style}>
            <CardTitle
              title="Public Workshops"
              style={{  marginBottom: ".5rem", padding: 0 }}
            />
            <CardText style={{ margin: 0, padding: 0 }}>
              Open-enrollment workshops at our training center in San Clemente, California.
            </CardText>
            <CardActions>
              <FlatButton label="Schedule" onClick={() => alert("Todo")} />
            </CardActions>
          </Card>
          <Card style={style}>
            <CardTitle
              title="Private Workshops"
              style={{ marginBottom: ".5rem", padding: 0 }}
            />
            <CardText style={{ margin: 0, padding: 0 }}>
              Schedule an on-site workshop at your company's location.
            </CardText>
            <CardActions>
              <FlatButton
                label="More Inforation"
                onClick={() => alert("Todo")}
              />
            </CardActions>
          </Card>
        </Row>

      </Block>
    );
  }
}
