import React, {Component} from "react"
import Block from "jsxstyle/Block"
import * as showdown from "showdown"

const converter = new showdown.Converter()

/**
 * converts "<p>foo</p>" to "foo"
 * @param text
 */
function trimOuterP(text) {
  if (text.startsWith("<p>") && text.endsWith("</p>")) {
    const i1 = 3
    const i2 = text.length - 4
    return text.substring(i1, i2)
  }
  else {
    return text
  }
}

export default class Node extends Component {
  render() {

    const depth = this.props.depth
    const id = this.props.id
    const map = this.props.map
    const n = map.get(id)

    const type = this.computeType(n, depth)   //Root | Intro | Topics

    if (type === "Root") {
      return this.renderRoot(n, map)
    }
    else if (type === "Meta") {
      if (depth === 1) {
        return this.renderMetaRoot(n, map)
      } else if (depth === 2) {
        return this.renderMetaNode(n, map)
      } else {
        throw new Error("IllegalState")
      }
    }
    else if (type === "Intro") {
      if (depth === 1) {
        return this.renderIntroRoot(n, map)
      } else if (depth === 2) {
        return this.renderIntroNode(n, map)
      } else {
        throw new Error("IllegalState")
      }
    } else if (type === "Topics") {
      if (depth === 1) {
        return this.renderTopicRoot(n, map)
      } else if (depth === 2) {
        return this.renderTopicNodeL1(n, map)
      }
      else if (depth === 3) {
        return this.renderTopicNodeL2(n, map)
      }
      else if (depth === 4) {
        return this.renderTopicNodeL3(n, map)
      }
      else {
        throw new Error("IllegalState")
      }
    } else {
      throw new Error("IllegalState")
    }
  }

  renderRoot(n, map) {
    return (
      <Block>
        {this.renderChildNodes(n, map)}
      </Block>
    )
  }

  renderIntroRoot(n, map) {
    return (
      <Block>
        {this.renderNotes(n)}
        {this.renderChildNodes(n, map)}
      </Block>
    )
  }

  renderMetaRoot(n, map) {
    return (
      <Block>
        {this.renderChildNodes(n, map)}
      </Block>
    )
  }

  renderIntroNode(n, map) {
    return (
      <Block>
        <h2 className='workshop-h3'>{n.content}</h2>
        {this.renderNotes(n)}
        {this.renderChildNodes(n, map)}
      </Block>
    )
  }

  renderMetaNode(n, map) {
    const tags = n.tags
    console.assert(tags)
    if (tags.hasOwnProperty('title')) {
      return <h1 className="workshop-title">{n.content}</h1>
    }
    else if (tags.hasOwnProperty('days')) {
      return <div className="workshop-subtitle">{n.content}-day hands-on workshop</div>
    }
    else {
      throw new Error("IllegalState")
    }
  }

  renderTopicRoot(n, map) {
    return (
      <Block>
        <h1 className="workshop-h1">What You'll Learn</h1>
        {this.renderNotes(n)}
        {this.renderChildNodes(n, map)}
      </Block>
    )
  }

  renderTopicNodeL1(n, map) {
    return (
      <Block>
        <h2 className='workshop-h2'>{n.content}</h2>
        {this.renderNotes(n)}
        {this.renderChildNodes(n, map)}
      </Block>
    )
  }

  markdown(markdownText) {
    const html = converter.makeHtml(markdownText.trim())
    const htmlTrimmed = trimOuterP(html)
    const o = {__html: htmlTrimmed}
    return <span dangerouslySetInnerHTML={o}/>
  }

  renderTopicNodeL2(n, map) {
    const depth = this.props.depth
    const maxDepth = this.props.maxDepth
    if (depth > maxDepth) return null
    const marginLeft = String(depth - 1) + "rem"
    return (
      <div className="workshop-li" style={{marginLeft, display: "list-item"}}>
        {this.markdown(n.content)}
        {this.renderChildNodes(n, map,true)}
      </div>
    )
  }

  renderTopicNodeL3(n, map) {
    const depth = this.props.depth
    const maxDepth = this.props.maxDepth
    if (depth > maxDepth) return null
    const marginLeft = String(depth - 1) + "rem"
    return (
      <div className="workshop-li" style={{marginLeft, display: "list-item"}}>
        {this.markdown(n.content)}
      </div>
    )
  }

  renderNotes = (n) => n.notes ? n.notes.map(note => <p
    key={note.id}
    style={{marginTop: "1rem"}}
    dangerouslySetInnerHTML={{__html: converter.makeHtml(note.comment)}}/>) : null

  renderChildNodes(n, map, skipMarginTop = false) {
    if (n.tasks.length === 0) return null
    const depth = this.props.depth
    const type = this.computeType(n, depth)
    const marginTop = skipMarginTop?"":"1rem"
    return (
      <Block marginTop={marginTop}>
        {n.tasks.map(id => (
          <Node key={id} id={id} map={map} depth={depth + 1} maxDepth={this.props.maxDepth} type={type}/>
        ))}
      </Block>
    )
  }

  computeType(n, depth) {
    if (n.content === "Root") return "Root"
    if (n.content === "Intro") return "Intro"
    if (n.content === "Topics") return "Topics"
    if (n.content === "Meta") return "Meta"
    return this.props.type //use parent's type
  }
}