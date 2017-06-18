//@flow
import React from "react"
import Block from "jsxstyle/Block"
import StripeCheckout from "react-stripe-checkout"
import * as service from "./service"
import type {Workshop} from "./types"
import * as ss from "./ssutil"

type Props = {
  workshopKey: string,
  email: string,
  testMode: boolean,  //secret test mode
  onComplete: (string) => void
}

type State = {}

const TEST_TOKEN = "tok_visa"
const PUBLIC_KEYS = {
  test: "pk_test_AKRA49JAeG1iH7pXOZz556Tl",
  live: "pk_live_z0zrj4f5WMJOZwIhHI5tQLzM",
}

export default class CcPayment extends React.Component {

  props: Props
  state: State
  mounted: boolean

  constructor(props: Props) {
    super(props)
    this.state = {}
  }


  /**
   * In live mode, we use the token passed into this function.
   * In test mode we use:
   *    cc#:   "4242 4242 4242 4242"
   *    token: "tok_visa"
   */
  onToken = (tokenGeneratedByStripe) => {
    const params = {
      token: this.props.testMode ? TEST_TOKEN : JSON.stringify(tokenGeneratedByStripe)
    }
    const qs = ss.params(params)
    fetch('http://localhost:8080/charge', {
      method: 'POST',
      body: qs,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
    }).then(response => {
      response.json().then(json => {
        console.log("json: ", json)
        this.props.onComplete(json)
      })
    })
  }

  onCcClose = (event) => {
    console.log("onCcClose", event)
  }

  render() {
    const testMode = this.props.testMode
    const publicKey = testMode ? PUBLIC_KEYS.test : PUBLIC_KEYS.live
    const workshop: Workshop = service.loadWorkshopSync(this.props.workshopKey)
    const workshopTitle = workshop.title
    return (
      <Block>
        <StripeCheckout
          token={this.onToken}
          stripeKey={publicKey}
          name="Smart Soft Training, Inc."
          description={workshopTitle}
          amount={workshop.price * 100}
          currency="USD"
          locale="auto"
          image="https://stripe.com/img/documentation/checkout/marketplace.png"
          allowRememberMe={false}
          triggerEvent="onTouchTap"
          email={this.props.email}
          closed={this.onCcClose}
        />
      </Block>
    )
  }

}

CcPayment.propTypes = {}