import * as React from "react"
import * as Col from "jsxstyle/Col"
import {Card, CardTitle} from "material-ui/Card"
import TextField from "material-ui/TextField"
import * as moment from "moment"
import * as validator from "email-validator"
import * as ss from "./ssutil"
import type {Signup, Workshop} from "./types"

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

interface State {
  signup: Signup,
  isNew: boolean,
  key: string
}

interface Props {
  workshopKey: string,
  date: string
}

const initSignup = (props: Props) => {
  const today = moment().format("YYYY-MM-DD")
  const workshop: Workshop = service.loadWorkshopSync(props.workshopKey)
  return {
    name: "",
    companyName: "",
    phone: "",
    email: "",
    signupDate: today,
    workshopKey: props.workshopKey,
    date: props.date,
    price: workshop.price,
    paid: 0
  }
}

const initErrors = () => {
  return {
    name: "",
    companyName: "",
    phone: "",
    email: "",
  }
}

const sampleSignup = (props: Props) => {
  const today = moment().format("YYYY-MM-DD")
  const workshop: Workshop = service.loadWorkshopSync(props.workshopKey)
  return {
    name: "Dave Ford",
    companyName: "Smart Soft",
    phone: "714 654 6550",
    email: "dford@smart-soft.com",
    signupDate: today,
    workshopKey: props.workshopKey,
    date: props.date,
    price: workshop.price,
    paid: 0
  }
}


export default class SignupVu extends React.Component<Props, State> {

  constructor(props: Props) {
    super()
    this.state = {
      signup: initSignup(props),
      isNew: true,
      key: "",
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

  submitSignup = () => {
    const database = firebase.database()
    const signupsRef = database.ref("signups")
    const newSignupRef = signupsRef.push()
    let newKey = newSignupRef.key
    if (newKey === null) throw Error()

    this.setState({key: newKey})

    const url = "/signupRecord/" + newKey + "?isNewSignup=true"
    ss.spaRedir(url)

    newSignupRef.set(this.state.signup)
  }

  ch = (event: any) => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    const copy = {...this.state.signup, [name]: value}
    this.setState({
      signup: copy
    })
  }

  dateRangeFormatted = () => {
    const d1 = moment(this.props.date)
    const d2 = moment(d1).add(4, "days")
    return d1.format("ddd MMM D") + " - " + d2.format("ddd MMM D")
  }

  anyErrors() {
    const e: Signup = this.errors()
    // const eValues = Object.values(e);
    const eValues = Object.keys(e).map(key => e[key])
    return eValues.some(v => !!v)
  }

  errorsUI() {
    if (this.state.isNew) return initSignup(this.props)
    return this.errors()
  }

  errors(): Signup {
    const s: Signup = this.state.signup
    const e: Signup = initErrors()
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
    const ss = sampleSignup(this.props)
    this.setState({signup: ss})
  }

  render() {
    const state = this.state
    const signup = state.signup

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
                  value={signup.name}
                  onChange={this.ch}
                  errorText={errors.name}
                />
                <TextField
                  name="companyName"
                  style={inputStyle}
                  floatingLabelText="Company name"
                  value={signup.companyName}
                  onChange={this.ch}
                  errorText={errors.companyName}
                />

                <TextField
                  name="phone"
                  style={inputStyle}
                  floatingLabelText="Phone"
                  value={signup.phone}
                  onChange={this.ch}
                  errorText={errors.phone}
                />

                <TextField
                  name="email"
                  style={inputStyle}
                  floatingLabelText="Email"
                  value={signup.email}
                  onChange={this.ch}
                  errorText={errors.email}
                />

                <RaisedButton
                  label="Submit"
                  secondary={true}
                  style={{width: "100%", marginTop: "1rem"}}
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
