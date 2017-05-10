import React, { Component } from "react";
import data from "./data/thinking-in-react.js";
import "./WorkshopDetail.css";

export default class WorkshopDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createMarkup() {
    return { __html: data };
  }

  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}
