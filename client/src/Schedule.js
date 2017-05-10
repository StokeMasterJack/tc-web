import React from "react";
import moment from "moment";
import Block from "jsxstyle/Block";
import Col from "jsxstyle/Col";
import { Card, CardText,CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import * as ss from "./util";

const dates = ["2017-06-05", "2017-07-10", "2017-08-07", "2017-09-11"];

export default function Schedule(props) {
  return (
    <Col margin="1rem" alignItems="center">
      {dates.map(t => <ScheduleCard key={t} date={t} />)}
    </Col>
  );
}

function ScheduleCard(props) {
  const date1 = moment(props.date);
  const date2 = moment(date1).add(4, 'days');
  const dateString = date1.format("ddd MMM D") + " - " + date2.format("ddd MMM D");

  return (
    <Card style={{ maxWidth: "23rem", margin: "1rem" }}>
      <CardText>
        <Block fontWeight="500" fontSize="1.5rem" marginBottom=".5rem">{dateString}</Block>
        <Block fontSize="1.2rem">Thinking in React - San Clemente, CA</Block>
      </CardText>
      <CardActions style={{display:"flex",justifyContent:"center"}}>
        <FlatButton label="Register Now" onClick={() => ss.spaRedir("signup")} />
      </CardActions>
    </Card>
  );
}
