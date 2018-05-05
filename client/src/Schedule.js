import * as React from "react"
import * as moment from "moment"
import * as Block from "jsxstyle/Block"
import * as Col from "jsxstyle/Col"
import Link from "./Link"
import {Card, CardActions, CardText, CardTitle} from "material-ui/Card"
import RaisedButton from "material-ui/RaisedButton"
import * as ss from "./ssutil"
import events from "./data/events"
import * as service from "./service"
import type {Event, Workshop} from "./types"
import muiThemeable from 'material-ui/styles/muiThemeable';


interface Props {
  workshopKey: ?string
}

export default function Schedule(props: Props) {
  const workshopKey: ?string = props.workshopKey  //null for all
  const workshopTitle = workshopKey ? service.loadWorkshopSync(workshopKey).title : ""

  const filter = (event: Event) => {
    const workshop: Workshop = service.loadWorkshopSync(event.workshopKey)

    const leadTime = workshop.leadTime
    const minDate = moment().add(leadTime, "days").format("YYYY-MM-DD")
    return event.date > minDate && (!workshopKey || event.workshopKey === workshopKey)
  }
  const eventsFiltered = events.filter(filter).sort((a, b) => a.date.localeCompare(b.date))

  if (eventsFiltered.length === 0) {
    return <Block padding="2rem" textAlign="center">
      <Block>No {workshopTitle} workshops currently scheduled.</Block>
      <Block paddingTop="1rem">Send us an <Link to="/contact">email</Link> with your date preferences and we'll add one.</Block>
    </Block>
  }

  return (
    <Block>
      <CardTitle title="Schedule of Public Workshops"/>
      <Col alignItems="center">
        {eventsFiltered.map((event: any) => <ScheduleCard
          key={event.workshopKey + "-" + event.date}
          event={event}
          workshopKey={event.workshopKey}/>)}
      </Col>
    </Block>
  )
}

const ScheduleCard = muiThemeable()(ScheduleCardPrivate);
function ScheduleCardPrivate({workshopKey, event,muiTheme}: { workshopKey: string, event: Event,muiTheme:Object }) {

  console.log(muiTheme.palette);

  const soldOutColor = muiTheme.palette.primary2Color;
  console.log("soldOutColor: ", soldOutColor)

  const workshop = service.loadWorkshopSync(workshopKey)
  const workshopTitle = workshop.title
  const days = workshop.days
  const date = event.date
  const date1 = moment(date)
  const date2 = moment(date1).add(days - 1, 'days')
  const dateString = date1.format("ddd MMM D") + " - " + date2.format("ddd MMM D")
  const url = `/signup/${workshopKey}/${date}`
  return (
    <Card style={{maxWidth: "23rem", margin: "1rem", padding: "1rem"}}>
      <CardText>
        <Col alignItems="center">
          <Block fontWeight="bold" fontSize="1.2rem" marginBottom="1rem">{workshopTitle}</Block>
          <Block fontSize="1.2rem" marginBottom="1rem">{dateString}</Block>
          <Block fontSize="1.2rem"  marginBottom="1rem">San Clemente, CA</Block>
          {event.status && event.status === "SoldOut" ? <Block fontSize="1.2rem" color={soldOutColor}>Sold out</Block> : ""}
        </Col>
      </CardText>
      <CardActions style={{display: "flex", justifyContent: "center"}}>

        <RaisedButton
          label="Signup"
          secondary={true}
          onTouchTap={() => ss.spaRedir(url)}
        />

      </CardActions>
    </Card>
  )
}
