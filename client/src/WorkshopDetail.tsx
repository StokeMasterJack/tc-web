import * as React from "react";
import * as Block from "jsxstyle/Block.js";
import data from "./data/thinking-in-react";
import "./WorkshopDetail.css";
import FlatButton from "material-ui/FlatButton";
import { CardActions } from "material-ui/Card";
import * as ss from "./util";

export default class WorkshopDetail extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createMarkup() {
    return {__html: data};
  }

  render() {
    return <Block>
      <CardActions style={{ display:"flex",justifyContent:"space-between"}}>
        <FlatButton label="View Schedule" primary={true}  onClick={() => ss.spaRedir("/schedule")} />
        <FlatButton label="Signup Now!" primary={true} onClick={() => ss.spaRedir("/schedule")} />
      </CardActions>
      <div dangerouslySetInnerHTML={this.createMarkup()}/>
      <CardActions style={{ display:"flex",justifyContent:"space-between"}}>
        <FlatButton label="View Schedule" primary={true}  onClick={() => ss.spaRedir("/schedule")} />
        <FlatButton label="Signup Now!" primary={true} onClick={() => ss.spaRedir("/schedule")} />
      </CardActions>
    </Block>;
  }
}
