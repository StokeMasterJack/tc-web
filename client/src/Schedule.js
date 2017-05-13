//@flow
import React from "react";
import moment from "moment";
import Block from "jsxstyle/Block";
import Col from "jsxstyle/Col";
import {Card, CardActions, CardText} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import * as ss from "./util";
import publicEvents from "./data/publicEvents.json";
import workshops from "./data/workshops.json";
import * as t from "./types";

function eventKey(e: t.Event): string {
  return e.date + "-" + e.workshopKey + "-" + e.instructor;
}

export default function Schedule() {
  return (
    <Col margin="1rem" alignItems="center">
      {publicEvents.map((event: t.Event) => <ScheduleCard key={eventKey(event)} event={event}/>)}
    </Col>
  );
}

function qs(e:t.Event){
  return `workshopKey=${e.workshopKey}&date=${e.date}&days=${e.days}&price=${e.price}`;
}

function ScheduleCard({event}: { event: t.Event }) {
  const date1 = moment(event.date);
  const date2 = moment(date1).add(4, 'days');
  const dateString = date1.format("ddd MMM D") + " - " + date2.format("ddd MMM D");

  const workshop = workshops[event.workshopKey];
  const workshopTitle = workshop.title;
  const url = "signup?" + qs(event);

  return (
    <Card style={{maxWidth: "23rem", margin: "1rem"}}>
      <CardText>
        <Block fontWeight="500" fontSize="1.5rem" marginBottom=".5rem">{dateString}</Block>
        <Block fontSize="1.2rem">{workshopTitle} - San Clemente, CA</Block>
      </CardText>
      <CardActions style={{display: "flex", justifyContent: "center"}}>
        <FlatButton label="Register Now" onClick={() => ss.spaRedir(url)}/>
      </CardActions>
    </Card>
  );
}
