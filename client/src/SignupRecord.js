import * as React from "react"
import * as Block from "jsxstyle/Block"
import * as Row from "jsxstyle/Row"
import * as t from "./types"
import {Signup, Workshop} from "./types"
import * as firebase from "firebase/app"
import Link from "./Link"
import * as service from "./service"
import CcPayment from "./CcPayment"
import {Snackbar} from "material-ui"
import {CardTitle} from "material-ui/Card"

export type Snack = "PaymentAccepted" | "PaymentDeclined" | "None"

interface Props {
  id: string,
  testMode: boolean,
  isNewSignup: boolean
}
interface State {
  signup: ?Signup,
  snack: Snack
}

function computeSnackbarMessage(snack: Snack) {
  if (!snack) return ""
  if (snack === "PaymentAccepted") return "Payment Accepted"
  if (snack === "PaymentDeclined") return "Payment Declined"
  return ""
}

export default class SignupRecord extends React.Component<Props, State> {

  props: Props
  state: State
  mounted: boolean

  constructor(props: Props) {
    super(props)
    this.state = {
      signup: null,
      snack: "None"
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.snack !== nextProps.snack) {
      this.setState({snack: nextProps.snack})
    }
  }

  componentDidMount() {
    this.mounted = true
    this.fetchSignupRecord()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  //runs 4 seconds after "Payment accepted" msg and "thank you for signing up msg"
  handleRequestCloseSnackbar = () => {
    this.setState({snack: "None"})
  }

  onCcComplete = (json: object) => {
    if (json.type === "Ok") {
      const signup: Signup = this.state.signup
      if (signup === null) throw Error()
      this.setState({signup: {...signup, paid: signup.price,}, snack: "PaymentAccepted"})
    } else {
      console.log("response", json)
      this.setState({snack: "PaymentDeclined"})
    }
  }

  onPayLinkClick = (event) => {
    event.preventDefault()
    window.document.body.scrollTop = 1000
  }

  render() {
    if (this.state.signup === null) return <div>Loading...</div>

    const s: Signup = this.state.signup

    const balance: number = s.price - s.paid
    const hasBalance = balance > 0

    const workshopKey: string = s.workshopKey

    const workshop: Workshop = service.loadWorkshopSync(workshopKey)

    const d1 = t.eventStartDate(s.date, "ddd MMM D")
    const d2 = t.eventEndDate(s.date, workshop.days, "ddd MMM D")

    const testMode = this.props.testMode  //secret test mode


    const snack: Snack = this.state.snack
    const isNewSignup: boolean = this.props.isNewSignup

    const isSnackbarOpen = snack !== "None"
    const snackbarMsg = computeSnackbarMessage(snack)

    return (
      <Block>
        <CardTitle title="Signup Record"/>

        <Block padding="1rem">

          {testMode ? <Block color="red" marginBottom="1rem" fontWeight="bold" fontSize="1.5rem">SECRET TEST MODE</Block> : null}

          {isNewSignup ? <Block marginBottom="1rem" fontStyle="italic" color="red" >Thank you. You are now registered. You should receive an email confirmation soon.</Block> : null}

          {hasBalance ? <Block marginBottom="1rem" fontStyle="italic ">
            Note: your seat is not guaranteed until payment is received.
            We accept payment by <a
            href="#payByCheck"
            onClick={this.onPayLinkClick}
          >check</a> or <a
            href="#payByCreditCard"
            onClick={this.onPayLinkClick}
          >credit card</a>.
          </Block> : <br/>
          }

          {this.field("Registration ID", s.id)}
          {this.field("Workshop", workshop.title)}
          {this.field("Days", workshop.days)}
          {this.field("Start Date", d1)}
          {this.field("End Date", d2)}
          {this.field("Email", s.email)}
          {this.field("Company", s.companyName)}
          {this.field("Price", "$" + String(s.price))}
          {this.field("Paid", "$" + String(s.paid))}
          {this.field("Balance", "$" + String(balance), hasBalance)}

          {hasBalance ?
            <Block>
              <Block>
                <CardTitle title="Pay by Credit Card"/>
                <Block paddingLeft="1rem">
                  <CcPayment
                    workshopKey={workshopKey}
                    email={s.email}
                    testMode={testMode}
                    onComplete={this.onCcComplete}/>
                  <p>Or, if you prefer, you can pay by credit card over the <Link to="/contact">phone</Link>.</p>
                </Block>
              </Block>

              <Block>
                <CardTitle title="Pay by Check"/>
                <Block paddingLeft="1rem">
                  <Block marginBottom=".5rem">Please mail check to:</Block>
                  <i>
                    Smart Soft Training Inc.<br/>
                    14 Via Alonso<br/>
                    San Clemente, CA 92673<br/>
                  </i>
                  <Block marginTop="1rem">Make check payable to <b>Smart Soft Training, Inc.</b></Block>
                </Block>
              </Block>


            </Block>

            : <br/> }

        </Block>
        <Snackbar
          open={isSnackbarOpen}
          message={snackbarMsg}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestCloseSnackbar}
        />

      </Block>
    )
  }

  emphColor = (emph: boolean) => emph ? "red" : "black"

  field = (label, data, emph: boolean) => (
    <Row>
      <Block width="10rem" padding=".3rem" margin=".3rem" background="#DDDDDD" color={this.emphColor(emph)} textAlign="right"
             fontStyle="italic">{label}:</Block>
      <Block width="30rem" padding=".3rem" margin=".3rem" color={this.emphColor(emph)}>{data}</Block>
    </Row>
  )

  fetchSignupRecord() {
    const id = this.props.id
    const database = firebase.database()
    const signupRef = database.ref("signups/" + id)
    signupRef.on("value", snapshot => {
      if (snapshot === null) throw Error()
      const signup = snapshot.val()
      if (signup.test === null || signup.test === undefined) {
        signup.test = false
      }
      signup.id = id
      this.setState({signup})
    })
  }
}

