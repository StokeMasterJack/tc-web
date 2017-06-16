import * as React from "react"
import * as Col from "jsxstyle/Col"
import {Card, CardTitle} from "material-ui/Card"
import TextField from "material-ui/TextField"
import * as moment from "moment"
import * as validator from "email-validator"
import * as ss from "./ssutil"
import * as t from "./types"

import * as firebase from "firebase/app"
import "firebase/database"
import * as Block from "jsxstyle/Block"
import * as service from "./service"
import {RaisedButton} from "material-ui"

const style = {
  padding: "1rem"
}

const inputStyle = {
  width: "100%"
}


interface State extends t.Signup {
  isNew: boolean,
  key: string
}

interface Props {
  workshopKey: string,
  date: string
}


// interface Props {
//   workshop: Workshop
// }

const initData = () => ({
  name: "",
  companyName: "",
  phone: "",
  email: ""
})


const sampleData = () => ({
  name: "Dave Ford",
  companyName: "Smart Soft",
  phone: "714 654 6550",
  email: "dford@smart-soft.com"
})

export default class Signup extends React.Component<Props, State> {

  constructor(props: Props) {
    super()
    this.state = {
      ...initData(props.workshopKey, props.date), //todo
      isNew: true,
      key: ""
    }
  }

  componentDidMount() {
    const firstField = document.getElementById("name")
    if (firstField === null) throw Error()
    firstField.focus()
  }

  onSubmit = (event: Event) => {
    event.preventDefault()
    this.setState({isNew: false})
    const ae = this.anyErrors()
    if (!ae) this.submitSignup()
  }

  /*
   eventDate: "2017-01-01"
   workshopKey: "react"
   signupDate: "2017-01-01"
   firstName:
   lastName:
   companyName:
   phone:
   email:
   */
  submitSignup = () => {

    const database = firebase.database()
    const signupsRef = database.ref("signups")
    const today = moment().format("YYYY-MM-DD")
    const copy = {...this.state, signupDate: today, workshopKey: this.props.workshopKey, date: this.props.date}
    delete copy.isNew
    delete copy.key
    const newSignupRef = signupsRef.push()
    let k = newSignupRef.key
    if (k === null) throw Error()
    this.setState({key: k})
    newSignupRef.set(copy)
  }

  ch = (event: any) => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  dateRangeFormatted = () => {
    const d1 = moment(this.props.date)
    const d2 = moment(d1).add(4, "days")
    return d1.format("ddd MMM D") + " - " + d2.format("ddd MMM D")
  }

  anyErrors() {
    const e: t.Signup = this.errors()
    // const eValues = Object.values(e);
    const eValues = Object.keys(e).map(key => e[key])
    return eValues.some(v => !!v)
  }

  errorsUI() {
    if (this.state.isNew) return initData("")
    return this.errors()
  }

  errors(): t.Signup {
    const s: State = this.state
    const e: t.Signup = initData("")
    if (!s.name) e.name = "Enter your Name"
    if (!s.companyName) e.companyName = "Enter your Company Name"
    if (!s.phone) {
      e.phone = "Enter your Phone Number"
    } else if (!ss.isValidPhoneNumber(s.phone)) {
      e.phone = "Enter a valid Phone Number"
    }
    if (!s.email) {
      e.email = "Enter your email"
    } else if (!validator.validate(s.email)) {
      e.email = "Enter a valid email address"
    }
    return e
  }

  onSampleDataClick = (event) => {
    event.preventDefault()
    this.setState(sampleData())
  }

  render() {
    const state = this.state

    if (state.key) {
      ss.spaRedir("/signupRecord/" + state.key)
      return null
    }

    const errors = this.errorsUI()

    const headItemStyle = {
      margin: 0,
      padding: 0,
      paddingBottom: ".2rem"
    }

    const workshopKey = this.props.workshopKey
    const workshop = service.loadWorkshopSync(workshopKey)

    return (
      <Block>
        <CardTitle title="Smart Soft Signup Form"/>
        <Col alignItems="center">

          <Block width="40rem">

            <Card style={style}>
              <Block fontSize="1.2rem" marginBottom=".5rem"><b>{workshop.title}</b></Block>
              <div style={headItemStyle}>{workshop.subtitle}</div>
              <div style={headItemStyle}>{this.dateRangeFormatted()}</div>
              <div style={headItemStyle}>{ss.formatCurrency(workshop.price)}</div>
            </Card>
            <Block height="1rem" props={{onClick: this.onSampleDataClick}}>
              &nbsp;
            </Block>
            <Card style={style}>
              <form autoComplete="off">
                <TextField
                  id="name"
                  name="name"
                  style={inputStyle}
                  floatingLabelText="Name"
                  value={state.name}
                  onChange={this.ch}
                  errorText={errors.name}
                />
                <TextField
                  name="companyName"
                  style={inputStyle}
                  floatingLabelText="Company name"
                  value={state.companyName}
                  onChange={this.ch}
                  errorText={errors.companyName}
                />

                <TextField
                  name="phone"
                  style={inputStyle}
                  floatingLabelText="Phone"
                  value={state.phone}
                  onChange={this.ch}
                  errorText={errors.phone}
                />

                <TextField
                  name="email"
                  style={inputStyle}
                  floatingLabelText="Email"
                  value={state.email}
                  onChange={this.ch}
                  errorText={errors.email}
                />

                <RaisedButton
                  label="Submit"
                  secondary={true}
                  style={{width: "100%",marginTop:"1rem"}}
                  onTouchTap={this.onSubmit}
                />

              </form>
            </Card>
          </Block>
        </Col>
      </Block>
    )
  }
}
