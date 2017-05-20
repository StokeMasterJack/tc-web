import * as React from "react";
import * as Block from "jsxstyle/Block";
import WorkshopCard from "./WorkshopCard";
import workshops from "./data/workshops2";

export default class HomePage extends React.Component<any,any> {

  render() {
    return (
      <Block>
        {workshops.map(workshop => <WorkshopCard key={workshop.id} workshop={workshop} />)}
      </Block>
    );
  }
}
