import React, { Component } from "react";
import Block from "jsxstyle/Block";
import WorkshopCard from "./WorkshopCard";

export default class HomePage extends Component {

  render() {
    const workshops = this.props.workshops;
    return (
      <Block>
        {workshops.map(workshop => <WorkshopCard key={workshop.id} workshop={workshop} />)}
      </Block>
    );
  }
}
