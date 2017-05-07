import React, { Component } from "react";
import Block from "jsxstyle/Block";

export default class Node extends Component {
  render() {
    const id = this.props.id;
    const map = this.props.map;
    const n = map.get(id);
    return (
      <Block>
        {n.content}
        {this.renderChildNodes(n, map)}
      </Block>
    );
  }

  renderChildNodes(n, map) {
    if (n.tasks.length === 0) return null;

    return (
      <Block>
        {n.tasks.map(id => (
          <Block key={id} marginLeft='1rem'>
            <Node id={id} map={map} />
          </Block>
        ))}
      </Block>
    );
  }
}
