import React, {Component} from "react"
import Block from "jsxstyle/Block"
import Row from "jsxstyle/Row"
import Col from "jsxstyle/Col"
import Node from "./Node"
import * as service from "./service"
import * as ss from "./ssutil"
import RaisedButton from "material-ui/RaisedButton"

function buildRootNode(nodes) {
  const rootNode = {
    content: "Root"
  }
  rootNode.tasks = []
  nodes.forEach(n => {
    if (n.parent_id === 0) {
      rootNode.tasks.push(n.id)
    }
  })
  return rootNode
}

function buildMap(nodes) {
  const m = new Map()
  nodes.forEach(n => m.set(n.id, n))
  const rootNode = buildRootNode(nodes)
  m.set(0, rootNode)
  return m
}

interface Props {
  workshopKey: string
}


export default class WorkshopDetail extends Component<Props, undefined> {
  constructor(props) {
    super(props)
    this.state = {
      outline: null
    }
  }

  componentDidMount() {
    this.fetchOutline(this.props)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.fetchOutline(nextProps)
  }

  computeSeoTitle(props: Props) {
    const workshopKey = props.workshopKey
    return ss.capFirstLetter(workshopKey) + " Training"
  }

  computeSeoMetaDesc(props: Props) {
    const workshopKey = ss.capFirstLetter(props.workshopKey)
    return `5-day hands-on, instructor-led ${workshopKey} training. Public and private workshops.`
  }

  resetTitleAndMeta(props: Props) {
    const seoTitle = this.computeSeoTitle(props)
    const seoMetaDesc =  this.computeSeoMetaDesc(props)
    window.document.title = seoTitle
    const meta = window.document.querySelector("meta[name='description']")
    meta.setAttribute("content", seoMetaDesc)
  }

  fetchOutline(props: Props) {
    this.resetTitleAndMeta(props)
    const outline = service.loadOutlineSync(props.workshopKey)
    this.setState({outline})
  }

  render() {

    const outline = this.state.outline
    if (outline === null) return <Block>Loading...</Block>

    const map = buildMap(outline)

    return <Col alignItems="center">
      <Block padding="1rem" maxWidth="50rem">
        <h1 className="workshop-title">{outline.title}</h1>
        <div className="workshop-subtitle">{outline.subtitle}</div>
        {this.renderButtons()}
        <br/>
        <Node id={0} map={map} depth={0} maxDepth="3  " type="Root"/>
        <br/>
        {this.renderButtons()}
      </Block>
    </Col>
  }

  renderButtons() {

    const bStyle = {
      marginRight:".5rem"
    }
    const workshopKey: string = this.props.workshopKey
    const scheduleUrl: string = `/schedule/${workshopKey}`
    return <Row>
      <RaisedButton
        label="Dates"
        secondary={true}
        onTouchTap={() => ss.spaRedir(scheduleUrl)}
        style={bStyle}/>
      <RaisedButton
        label="Testimonials"
        secondary={true}
        onTouchTap={() => ss.spaRedir("/testimonials")}
        style={bStyle}
      />
      <RaisedButton
        label="Signup Now!"
        secondary={true}
        onTouchTap={() => ss.spaRedir(scheduleUrl)}
        style={bStyle}/>
    </Row>
  }

}

