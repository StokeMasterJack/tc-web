import React from "react";
import { Card, CardText } from "material-ui/Card";
import Block from "jsxstyle/Block";

export default function TestimonialCard(props) {
  const t = props.testimonial;
  return (
    <Card style={{ width: "90%", margin: "1rem" }}>
      <CardText>
        <Block marginBottom='.5rem'>{t.text}</Block>
        <Block fontStyle="italic">{t.student}</Block>
        <Block fontStyle="italic">{t.company}</Block>
      </CardText>
    </Card>
  );
}
