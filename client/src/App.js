import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Block from "jsxstyle/Block";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { spaRedir } from "./util";
import HomePage from "./HomePage";
import Workshops from "./Workshops";
import Contact from "./Contact";
import Outline from "./Outline";
import Eval from "./Eval";
import Testimonials from "./Testimonials";
import workshops from "./workshops.json";
import testimonials from "./testimonials.json";
import trimStart from "lodash/trimStart";
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#fc0303'
  }
});

function parsePath() {
  let path = window.location.pathname;
  path = trimStart(path, "/");
  const a = path.split("/");
  if (a.length === 0 || a[0] === "") {
    return {
      page: "",
      id: ""
    };
  }
  if (a.length === 1) {
    return {
      page: a[0],
      id: ""
    };
  }
  if (a.length === 2) {
    return {
      page: a[0],
      id: a[1]
    };
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    window.addEventListener("popstate", e => {
      this.forceUpdate();
    });

    this.state = {
      open: false
    };
  }

  route(path) {
    const page = path.page;
    if (page === "") return <HomePage workshops={workshops} />;
    if (page === "workshops") return <Workshops workshops={workshops} />;
    if (page === "contact") return <Contact />;
    if (page === "testimonials") return <Testimonials testimonials={testimonials} />;
    if (page === "outline") return <Outline />;
    if (page === "eval") return <Eval/>;
    return <div>Bad Route. You suck!</div>;
  }

  onMenuButtonClick = () => {
    this.setState({
      open: true
    });
  };

  onHomeClick = () => {
    spaRedir("");
    this.setState({ open: false });
  };

  onWorkshopsClick = () => {
    spaRedir("workshops");
    this.setState({ open: false });
  };

  onContactClick = () => {
    spaRedir("contact");
    this.setState({ open: false });
  };

  onTestimonialsClick = () => {
    spaRedir("testimonials");
    this.setState({ open: false });
  };

  onEvalClick = () => {
    spaRedir("eval");
    this.setState({ open: false });
  };

  render() {
    const path = parsePath();
    const tab = this.route(path);
    return (
      <MuiThemeProvider  muiTheme={muiTheme}>

        <Block>
          <AppBar
            title={<span style={{ cursor: "pointer" }}>React Training</span>}
            onLeftIconButtonTouchTap={this.onMenuButtonClick}
            onTitleTouchTap={this.onHomeClick}
          />

          <Drawer
            open={this.state.open}
            docked={false}
            width={200}
            onRequestChange={open => this.setState({ open })}
          >
            <MenuItem onClick={this.onHomeClick}>Home</MenuItem>
            <MenuItem onClick={this.onWorkshopsClick}>Workshops</MenuItem>
            <MenuItem onClick={this.onContactClick}>Contact Us</MenuItem>
            <MenuItem onClick={this.onTestimonialsClick}>Testimonials</MenuItem>
            <MenuItem onClick={this.onEvalClick}>Post Class Evaluation</MenuItem>
          </Drawer>

          {tab}

        </Block>

      </MuiThemeProvider>
    );
  }
}
