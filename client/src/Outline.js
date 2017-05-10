import React, { Component } from "react";
import Block from "jsxstyle/Block";
import Node from "./Node";
import outline from "./data/outline.json";

function buildRootNode(nodes) {
  const rootNode = {
    content: "Root"
  };
  rootNode.tasks = [];
  nodes.forEach(n => {
    if (n.parent_id === 0) {
      rootNode.tasks.push(n.id);
    }
  });
  return rootNode;
}

function buildMap(nodes) {
  const m = new Map();
  nodes.forEach(n => m.set(n.id, n));
  const rootNode = buildRootNode(nodes);
  m.set(0, rootNode);
  return m;
}

export default class Outline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outline: outline
    };
  }

  componentDidMount() {
    if(true) return;
    //this is not working due to cors problem. Have question in to checkvist
    const url = "https://checkvist.com/checklists/610976/tasks.json";
    fetch(url, {
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        this.setState(json);
      });
  }

  render() {
    const nodes = this.state.outline;
    if (nodes === null) return <Block>Loading...</Block>;
    const map = buildMap(nodes);
    return (
      <Block margin="1rem">
        <Node id={0} map={map} />
      </Block>
    );
  }
}
