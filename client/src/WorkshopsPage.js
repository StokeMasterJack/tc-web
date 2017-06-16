import * as React from "react"
import * as Col from "jsxstyle/Col"
import {CardTitle} from "material-ui/Card"
import Workshops from "./Workshops"

export default class WorkshopsPage extends React.Component<any, any> {

  render() {
    return (
      <Col>
        <CardTitle title="Workshops"/>
        <Workshops/>
      </Col>
    )
  }
}
