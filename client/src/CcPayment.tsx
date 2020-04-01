import React from 'react';
import {Block} from 'jsxstyle';
import * as service from './service';
import {DWorkshop} from './types';
import StripeCheckout, {Token} from 'react-stripe-checkout';

type OnToken = (token: Token) => void;

const PUBLIC_KEYS = {
  test: 'pk_test_AKRA49JAeG1iH7pXOZz556Tl',
  live: 'pk_live_z0zrj4f5WMJOZwIhHI5tQLzM'
};

export default function ({testMode, workshopKey, onToken, email}: { testMode: boolean, workshopKey: string, onToken: OnToken, email: string }) {

  // const onCcClose = (event: any) => {
  //   console.log("onCcClose", event);
  // };

  const publicKey = testMode ? PUBLIC_KEYS.test : PUBLIC_KEYS.live;
  const workshop: DWorkshop = service.loadWorkshopSync(workshopKey);
  const workshopTitle = workshop.title;

  return (
    <Block>
      <StripeCheckout
        token={onToken}
        stripeKey={publicKey}
        name="Smart Soft Training, Inc."
        description={workshopTitle}
        amount={workshop.price * 100}
        currency="USD"
        locale="auto"
        image="https://stripe.com/img/documentation/checkout/marketplace.png"
        allowRememberMe={false}
        triggerEvent="onClick"
        email={email}
      />
    </Block>
  );

}
