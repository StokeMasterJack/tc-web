import React, { Component } from "react";
import Block from "jsxstyle/Block";
import WorkshopCard from "./WorkshopCard";
import workshops from "./workshops.json";

export default class HomePage extends Component {

  render() {
    return (
      <Block>
        {workshops.map(workshop => <WorkshopCard key={workshop.id} workshop={workshop} />)}
      </Block>
    );
  }
}
