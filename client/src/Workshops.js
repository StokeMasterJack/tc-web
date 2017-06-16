import * as React from "react"
import * as Col from "jsxstyle/Col"
import WorkshopCard from "./WorkshopCard"
import workshops from "./data/workshops.json"

export default class Workshops extends React.Component<any, any> {

  render() {
    return (
      <Col alignItems="center" paddingTop="1rem">
        {workshops.map(workshop => <WorkshopCard
          key={workshop.key} workshop={workshop}
        />)
        }
      </Col>
    )
  }
}
