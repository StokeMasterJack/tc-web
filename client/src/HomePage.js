import * as React from "react";
import * as Block from "jsxstyle/Block";
import * as Row from "jsxstyle/Row";
import WorkshopDetail from "./WorkshopDetail";
import Testimonials from "./Testimonials";
import { Card, CardTitle, CardText, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import "./HomePage.css";
import * as ss from "./util";
import logo from "./images/ss-logo-transparent.png"

export default class HomePage extends React.Component<any,any> {
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
        <img src={logo} alt="Smart Soft - React Training" />
      </Row>
      <Row
        justifyContent="center"
        fontSize="2rem"
        alignItems="center"
        paddingTop="3.2rem"
        textAlign="center"
      >
        Instructor-led React Training
      </Row>

      <Row
        justifyContent="center"
        fontSize="1.6rem"
        alignItems="center"
        paddingTop=".8rem"
        textAlign="center"
        fontStyle="italic"
      >
        by Smart Soft
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
              Open-enrollment workshops at our training center in <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tripadvisor.com/Tourism-g33012-San_Clemente_California-Vacations.html">San Clemente</a>, California.
            </Block>
            <Block marginTop="1rem">Max class size: 4 students.</Block>
          </CardText>
        </Block>
        <CardActions>
          <FlatButton primary={true}  label="Schedule" onClick={() => ss.spaRedir("/schedule")} />
        </CardActions>
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
        <CardActions>
          <FlatButton primary={true}  label="More Information" onClick={()=>ss.spaRedir("/privateWorkshops")} />
        </CardActions>
      </Card>
    </Row>
  );

  workshopDetail = () => (
    <div className="HomePage-workshopDetail">
      <Card style={{ padding: "1rem" }}>
        <WorkshopDetail />
      </Card>
    </div>
  );

  testimonials = () => (
    <div className="HomePage-workshopDetail">
      <Card>
        <Testimonials />
      </Card>
    </div>
  );
}
