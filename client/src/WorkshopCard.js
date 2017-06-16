import * as React from "react"
import {Card, CardActions, CardText, CardTitle} from "material-ui/Card"
import RaisedButton from "material-ui/RaisedButton"
import {spaRedir} from "./ssutil"
import * as service from "./service"
import * as ss from "./ssutil"

function extractFirstIntroParagraph(outline) {
  for (const node of outline) {
    if (node.content === "Intro") {
      return node.notes[0].comment
    }
  }
  throw Error()
}

const WorkshopCard = props => {
  const workshop = props.workshop

  const key: string = workshop.key
  const title: string = workshop.title
  const subtitle: string = workshop.subtitle

  const outline = service.loadOutlineSync(key)

  const introPara = extractFirstIntroParagraph(outline)

  const detailsUrl: string = key.toLowerCase() + "-training"
  const scheduleUrl: string = `/schedule/` + key
  const datesMouseOver = `Schedule of Public ${ss.capFirstLetter(key)} Workshops`;

  return (
    <Card style={{width: "90%", margin: "1rem", maxWidth: "50rem"}}>
      <CardTitle title={title} subtitle={subtitle}/>
      <CardText>
        {introPara}
      </CardText>
      <CardActions>
        <RaisedButton
          label="Details"
          secondary={true}
          onTouchTap={() => spaRedir(detailsUrl)}
        />
        <RaisedButton
          label="Dates"
          secondary={true}
          title={datesMouseOver}
          onTouchTap={() => spaRedir(scheduleUrl)}
        />
        <RaisedButton
          label="Testimonials"
          secondary={true}
          onTouchTap={() => spaRedir("/testimonials")}
        />
      </CardActions>
    </Card>
  )
}

export default WorkshopCard
