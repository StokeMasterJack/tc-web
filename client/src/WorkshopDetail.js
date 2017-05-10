import React, { Component } from "react";
import data from "./data/thinking-in-react.js";
import css from "./WorkshopDetail.css";

const style = {
  margin: "1rem"
};

export default class WorkshopDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createMarkup() {
    return { __html: data };
  }

  render() {
    return <div style={style} dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}
