//@flow
import React from "react"
import Block from "jsxstyle/Block"
import StripeCheckout from "react-stripe-checkout"
import * as service from "./service"
import type {Workshop} from "./types"

type Props = {
  workshopKey: string,
  email: string,
  price: number,
  testMode: boolean,  //secret test mode
  onToken: (string) => void,
  signupId: string
}

type State = {}

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
          token={this.props.onToken}
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