import * as React from "react";
import data from "./data/thinking-in-react";
import "./WorkshopDetail.css";

export default class WorkshopDetail extends React.Component<any,any> {
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
