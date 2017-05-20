import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as Block from "jsxstyle/Block.js";
import * as Row from "jsxstyle/Row";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import * as ss from "./util";
import HomePage from "./HomePage";
import Workshops from "./Workshops";
import Contact from "./Contact";
import Schedule from "./Schedule";
import Signup from "./Signup";
import SignupRecord from "./SignupRecord";
import PrivateWorkshops from "./PrivateWorkshops";
import PayWithCreditCard from "./PayWithCreditCard";
import * as t from "./types";
import WorkshopDetail from "./WorkshopDetail";
import Eval from "./Eval";
import Testimonials from "./Testimonials";
import * as lodash from "lodash";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import IconButton from "material-ui/IconButton";
import CancelIcon from "material-ui/svg-icons/navigation/cancel";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#fc0303",
    primary2Color: "#9a0000" 
  }
});

function parsePath(): t.Path {
  let path = window.location.pathname;
  path = lodash.trimStart(path, "/");
  const a = path.split("/");
  if (a.length === 0 || a[0] === "") {
    return {
      page: "",
      id: ""
    };
  }
  else if (a.length === 1) {
    return {
      page: a[0],
      id: ""
    };
  }
  else if (a.length === 2) {
    return {
      page: a[0],
      id: a[1]
    };
  } else {
    throw Error("Unsupported URL path[" + path + "]");
  }
}

export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }


  router(path: t.Path) {
    const page = path.page;
    const id = path.id;
    if (page === "") return <HomePage />;
    if (page === "workshops") return <Workshops />;
    if (page === "contact") return <Contact />;
    if (page === "testimonials") return <Testimonials />;
    // if (page === "outline") return <Outline />;
    if (page === "workshopDetail") return <Block margin="1rem"><WorkshopDetail /></Block>;
    if (page === "schedule") return <Schedule />;
    if (page === "signup") return <Signup eventId={id}/>;
    if (page === "eval") return <Eval />;
    if (page === "signupRecord") return <SignupRecord id={id}/>;
    if (page === "privateWorkshops") return <PrivateWorkshops/>;
    if (page === "payWithCreditCard") return <PayWithCreditCard/>;
    return <div>Bad Route. You suck!</div>;
  }

  onHamburgerClick = () => {
    this.setState({
      open: true
    });
  };

  onCloseDrawerClick = () => {
    this.setState({open: false});
  };

  render() {
    const path: t.Path = parsePath();
    const tab = this.router(path);

    const redir = route => {
      ss.spaRedir(route);
      this.setState({open: false});
    };

    const menu = (route, label) => (
      <MenuItem onTouchTap={() => redir(route)}>{label}</MenuItem>
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Block>
          <AppBar
            title={<span style={{cursor: "pointer"}}>Instructor-led React Training</span>}
            onLeftIconButtonTouchTap={this.onHamburgerClick}
            onTitleTouchTap={() => redir("/")}
          />
          <Drawer
            open={this.state.open}
            docked={false}
            width={200}
            onRequestChange={open => this.setState({open})}
          >
            <Row justifyContent="flex-end" background="#fc0303" height="4rem" alignItems="center">
              <IconButton onTouchTap={this.onCloseDrawerClick}>
                <CancelIcon />
              </IconButton>
            </Row>
            {menu("/", "Home")}
            {/*{menu("workshops", "Workshops")}*/}
            {menu("/workshopDetail", "Thinking in React")}
            {menu("/contact", "Contact Us")}
            {menu("/testimonials", "Testimonials")}
            {menu("/eval", "Post Class Evaluation")}
            {menu("/schedule", "Schedule")}
            {menu("/signup/1", "Signup")}
            {menu("/privateWorkshops", "Private Workshops")}
          </Drawer>
          {tab}
        </Block>
      </MuiThemeProvider>
    );
  }
}
