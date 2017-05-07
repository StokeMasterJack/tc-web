import React from "react";
import Block from "jsxstyle/Block";
import TestimonialCard from "./TestimonialCard";
import { CardTitle } from "material-ui/Card";
import testimonials from "./testimonials.json";

export default function Testimonials(props) {
  return (
    <Block margin="1rem">
      <CardTitle title="Testimonials" />
      {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
    </Block>
  );
}
