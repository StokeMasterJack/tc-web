import React from "react";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { spaRedir } from "./util";

function onOutlineClick(outlineUrl) {
  spaRedir("outline");
}

const WorkshopCard = props => {
  const workshop = props.workshop;
  return (
    <Card style={{ width: "90%", margin: "1rem" }}>
      <CardTitle title={workshop.title} subtitle={workshop.subtitle} />
      <CardText>
        {workshop.description}
      </CardText>
      <CardActions>
        <FlatButton
          label="Outline"
          onClick={() => onOutlineClick(workshop.outlineUrl)}
        />
        <FlatButton label="Upcoming Dates" />
      </CardActions>
    </Card>
  );
};

export default WorkshopCard;
