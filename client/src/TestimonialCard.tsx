import React from 'react';
import {Block} from "jsxstyle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Testimonial} from "./types";

export default function TestimonialCard({testimonial}: { testimonial: Testimonial }) {
  return (
    <Card style={{width: "90%", margin: "1rem"}}>
      <CardContent>
        <Block marginBottom='.5rem'>{testimonial.text}</Block>
        <Block fontStyle="italic">{testimonial.student}</Block>
        <Block fontStyle="italic">{testimonial.company}</Block>
      </CardContent>
    </Card>
  );
}
