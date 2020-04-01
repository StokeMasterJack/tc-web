import React from 'react';
import {Block} from 'jsxstyle';

export default function PayWithCreditCard() {
  return (
    <Block margin="1rem">
      <h1>Pay with Credit Card</h1>

      <form action="/your-server-side-code" method="POST">
        <script
          src="https://checkout.stripe.com/checkout.js"
          className="stripe-button"
          data-key="pk_test_AKRA49JAeG1iH7pXOZz556Tl"
          data-amount="999"
          data-name="Demo Site"
          data-description="Widget"
          data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
          data-locale="auto">
        </script>
      </form>

    </Block>
  );
}
