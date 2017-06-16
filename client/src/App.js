import * as React from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import * as paths from "./paths"
import * as Block from "jsxstyle/Block"
import * as Row from "jsxstyle/Row"
import AppBar from "material-ui/AppBar"
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
import * as ss from "./ssutil"
import WorkshopDetail from "./WorkshopDetail"
import HomePage from "./HomePage"
import WorkshopsPage from "./WorkshopsPage"
import Contact from "./Contact"
import Schedule from "./Schedule"
import Signup from "./Signup"
import SignupRecord from "./SignupRecord"
import PrivateWorkshops from "./PrivateWorkshops"
import PayWithCreditCard from "./PayWithCreditCard"
import Eval from "./Eval"
import Testimonials from "./Testimonials"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import IconButton from "material-ui/IconButton"
import CancelIcon from "material-ui/svg-icons/navigation/cancel"

const palette = {
  // primary1Color: "#fc0303",
  // primary2Color: "#9a0000"
}

const muiTheme = getMuiTheme({palette})

// console.log(muiTheme)

export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  setGlobalTitleAndMetaDesc() {
    const seoTitle = "React and Kotlin Training"
    const seoMetaDesc = "5-day hands-on, instructor-led React and Kotlin training. Public and private workshops."
    window.document.title = seoTitle
    const meta = window.document.querySelector("meta[name='description']")
    meta.setAttribute("content", seoMetaDesc)
  }


  router(path: string) {
    this.setGlobalTitleAndMetaDesc()
    if (paths.isRoot(path)) return <HomePage />

    //dead paths
    if (path === "/signup/Signup1.html") return <HomePage />
    if (path === "/signup/SignupForm.html") return <HomePage />

    const page: string = paths.firstSegment(path)
    const id: ?string = paths.lastSegment(path)

    if (page === "workshops") return <WorkshopsPage />
    if (page === "contact") return <Contact />
    if (page === "testimonials") return <Testimonials />

    if (page === "schedule") {
      const workshopKey = paths.segmentAt(path, 1)
      return <Schedule workshopKey={workshopKey}/>
    }

    if (page === "signup") {
      if (!id) throw Error()
      const workshopKey = paths.segmentAt(path, 1)
      const date = paths.segmentAt(path, 2)
      return <Signup workshopKey={workshopKey} date={date}/>
    }
    if (page === "eval") return <Eval />
    if (page === "signupRecord") {
      if (!id) throw Error()
      return <SignupRecord id={id}/>
    }
    if (page === "privateWorkshops") return <PrivateWorkshops/>
    if (page === "payWithCreditCard") return <PayWithCreditCard/>

    if (page.endsWith("-training")) {
      const workshopKey = page.replace("-training", "")
      return <WorkshopDetail workshopKey={workshopKey}/>
    }

    return <HomePage />
  }

  onHamburgerClick = () => {
    this.setState({
      open: true
    })
  }

  onCloseDrawerClick = () => {
    this.setState({open: false})
  }

  render() {
    const tab = this.router(window.location.pathname)

    const redir = route => {
      ss.spaRedir(route)
      this.setState({open: false})
    }

    const menu = (route, label) => (
      <MenuItem onTouchTap={() => redir(route)}>{label}</MenuItem>
    )

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Block>
          <AppBar
            title={<span style={{cursor: "pointer"}}>Smart Soft</span>}
            onLeftIconButtonTouchTap={this.onHamburgerClick}
            onTitleTouchTap={() => redir("/")}
          />
          <Drawer
            open={this.state.open}
            docked={false}
            width={200}
            onRequestChange={open => this.setState({open})}
          >
            <Row justifyContent="flex-end" background={muiTheme.palette.primary2Color} height="4rem" alignItems="center">
              <IconButton onTouchTap={this.onCloseDrawerClick}>
                <CancelIcon />
              </IconButton>
            </Row>
            {menu("/", "Home")}
            {menu("/kotlin-training", "Kotlin Training")}
            {menu("/react-training", "React Training")}
            {menu("workshops", "All Workshops")}
            {menu("/contact", "Contact Us")}
            {menu("/testimonials", "Testimonials")}
            {menu("/eval", "Post Class Evaluation")}
            {menu("/schedule", "Schedule")}
            {menu("/schedule", "Signup")}
            {menu("/privateWorkshops", "Private Workshops")}
          </Drawer>
          {tab}

          {/*<Row justifyContent="center" background={palette.primary1Color} color="white" padding=".5rem" marginTop="1rem">*/}
            {/*<Block>Smart Soft Developer Training - Southern California - USA</Block>*/}
          {/*</Row>*/}
        </Block>
      </MuiThemeProvider>
    )
  }
}
