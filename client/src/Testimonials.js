import React from "react";
import Block from "jsxstyle/Block";
import TestimonialCard from "./TestimonialCard";
import { CardTitle } from "material-ui/Card";

export default function Testimonials(props) {
  const testimonials = props.testimonials;
  return (
    <Block margin="1rem">
      <CardTitle title="Testimonials" />
      {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
    </Block>
  );
}
