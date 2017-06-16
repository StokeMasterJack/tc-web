import * as React from "react"
import * as Block from "jsxstyle/Block"
import * as Row from "jsxstyle/Row"
import Workshops from "./Workshops"
import {Card, CardActions, CardText, CardTitle} from "material-ui/Card"
import FlatButton from "material-ui/FlatButton"
import "./HomePage.css"
import * as ss from "./ssutil"
// import logo from "./images/ss-logo-transparent.png"
import logo2 from "./images/ss-logo-transparent-2.png"

export default class HomePage extends React.Component<any, any> {
  render() {
    return (
      <Block paddingTop="2rem">
        {this.header()}
        {this.boxes()}
        <Workshops />
      </Block>
    )
  }

  header = () => (
    <Block>
      <Row
        color="rgba(255, 255, 255, 0.541176)"
        justifyContent="center"
        alignItems="center"
      >
        {/*<img src={logo} alt="Smart Soft - React Training"/>*/}
        <img src={logo2} alt="Smart Soft - React Training"/>
      </Row>

      {/*<Row*/}
      {/*justifyContent="center"*/}
      {/*fontSize="2rem"*/}
      {/*alignItems="center"*/}
      {/*paddingTop="3.2rem"*/}
      {/*textAlign="center"*/}
      {/*>*/}
      {/*Instructor-led React Training*/}
      {/*</Row>*/}

    </Block>
  )

  boxStyle = {
    width: "19rem",
    margin: "1rem",
    textAlign: "center",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }

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
            style={{marginBottom: ".5rem", padding: 0}}
          />
          <CardText style={{margin: 0, padding: 0}}>
            <Block>
              Open-enrollment workshops at our training center in San Clemente, California.
            </Block>
            <Block marginTop="1rem">Max class size: 4 students</Block>
          </CardText>
        </Block>
        <CardActions>
          <FlatButton
            primary={true}
            label="Schedule"
            onClick={() => ss.spaRedir("/schedule")}
            title="Schedule of Public Workshops"
          />
        </CardActions>
      </Card>

      <Card style={this.boxStyle}>
        <Block>
          <CardTitle
            title="Private Workshops"
            style={{marginBottom: ".5rem", padding: 0}}
          />
          <CardText style={{margin: 0, padding: 0}}>
            <Block>
              Schedule an on-site workshop at your company's location.
            </Block>
            <Block marginTop="1rem">Max class size: 10 students</Block>

          </CardText>
        </Block>
        <CardActions>
          <FlatButton primary={true} label="More Information" onClick={() => ss.spaRedir("/privateWorkshops")}/>
        </CardActions>
      </Card>
    </Row>
  )

}
