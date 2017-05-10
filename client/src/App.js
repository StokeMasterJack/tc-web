import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Block from "jsxstyle/Block";
import Row from "jsxstyle/Row";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import * as ss from "./util";
import HomePage from "./HomePage";
import Workshops from "./Workshops";
import Contact from "./Contact";
import Schedule from "./Schedule";
// import Outline from "./Outline";
import WorkshopDetail from "./WorkshopDetail";
import Eval from "./Eval";
import Testimonials from "./Testimonials";
import trimStart from "lodash/trimStart";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import IconButton from "material-ui/IconButton";
import CancelIcon from "material-ui/svg-icons/navigation/cancel";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#fc0303"
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

  router(path) {
    const page = path.page;
    if (page === "") return <HomePage />;
    if (page === "workshops") return <Workshops />;
    if (page === "contact") return <Contact />;
    if (page === "testimonials") return <Testimonials />;
    // if (page === "outline") return <Outline />;
    if (page === "workshopDetail") return <WorkshopDetail />;
    if (page === "schedule") return <Schedule />;
    if (page === "eval") return <Eval />;
    return <div>Bad Route. You suck!</div>;
  }

  onHamurgerClick = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const path = parsePath();
    const tab = this.router(path);

    const redir = route => {
      ss.spaRedir(route);
      this.setState({ open: false });
    };

    const menu = (route, label) => (
      <MenuItem onTouchTap={() => redir(route)}>{label}</MenuItem>
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <Block>
          <AppBar
            title={<span style={{ cursor: "pointer" }}>React Training</span>}
            onLeftIconButtonTouchTap={this.onHamurgerClick}
            onTitleTouchTap={() => redir("")}
          />

          <Drawer
            open={this.state.open}
            docked={false}
            width={200}
            onRequestChange={open => this.setState({ open })}
          >
            <Row justifyContent="flex-end" background="#fc0303" height="4rem" alignItems="center">
              <IconButton onTouchTap={()=> this.setState({ open: false }) }>
                <CancelIcon/>
              </IconButton>
            </Row>
            {menu("", "Home")}
            {/*{menu("workshops", "Workshops")}*/}
            {menu("workshopDetail", "Thinking in React")}
            {menu("contact", "Contact Us")}
            {menu("testimonials", "Testimonials")}
            {menu("eval", "Post Class Evaluation")}
            {menu("schedule", "Schedule")}
          </Drawer>
          {tab}
        </Block>

      </MuiThemeProvider>
    );
  }
}
