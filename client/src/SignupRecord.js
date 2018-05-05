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
import * as ss from "./ssutil"
import * as cfg from "./cfg"

export type Snack = "PaymentAccepted" | "PaymentDeclined" | "None"

const TEST_TOKEN = "tok_visa"

interface Props {
  id: string,
  testMode: boolean,
  isNewSignup: boolean
}
interface State {
  signup: ?Signup,
  snack: Snack,
  badSignupId: ?string
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

  /**
   * In live mode, we use the token passed into this function.
   * In test mode we use:
   *    cc#:   "4242 4242 4242 4242"
   *    token: "tok_visa"
   */
  onToken = (tokenGeneratedByStripe) => {

    const signup = this.state.signup

    const params = {
      token: this.props.testMode ? TEST_TOKEN : JSON.stringify(tokenGeneratedByStripe),
      signupId: this.props.id,
      email: signup.email,
      price: signup.price
    }
    console.log("params", params)
    const qs = ss.params(params)
    fetch(`${cfg.api}/charge`, {
      method: 'POST',
      body: qs,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
    }).then(response => {
      response.json().then(json => {
        this.onCcComplete(json)
      })
    })
  }

  render() {
    if (this.state.badSignupId) return <Block margin="1rem">Bad signupId: {this.state.badSignupId}</Block>
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

          {isNewSignup ? <Block marginBottom="1rem" fontStyle="italic" color="red">Thank you. You are now registered. You should receive an email confirmation soon.</Block> : null}

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
          {this.field("Phone", s.phone)}
          {this.field("Name", s.name)}
          {this.field("Company", s.company)}
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
                    price={s.price}
                    testMode={testMode}
                    signupId={this.props.id}
                    onComplete={this.onCcComplete}
                    onToken={this.onToken}
                  />
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
      if (signup == null) {
        this.setState({badSignupId: id})
      } else {
        if (signup.test === null || signup.test === undefined) {
          signup.test = false
        }
        signup.id = id
        this.setState({signup})
      }
    })
  }
}

