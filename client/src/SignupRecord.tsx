import * as React from 'react';
import {useEffect, useState} from 'react';
import {Block, Row} from 'jsxstyle';
import {CEvent, CWorkshop, Signup} from './types';
import firebase from 'firebase/app';
import Lnk from './Lnk';
import * as service from './service';
import CcPayment from './CcPayment';
import Snackbar from '@material-ui/core/Snackbar';
import CardHeader from '@material-ui/core/CardHeader';
import * as ss from './util/ssutil';
import * as cfg from './cfg';
import {Token} from 'react-stripe-checkout';
import {ensure} from './util/ass';
import {LocalDate} from './util/date-time';

export type Snack = 'PaymentAccepted' | 'PaymentDeclined';

const TEST_TOKEN = 'tok_visa';

interface Props {
  id: string,
  testMode: boolean,
  isNewSignup: boolean
}

interface State {
  signup: Signup | null,
  snack: Snack,
  badSignupId: string | null
}

function computeSnackbarMessage(snack: Snack | undefined) {
  if (!snack) return '';
  if (snack === 'PaymentAccepted') return 'Payment Accepted';
  if (snack === 'PaymentDeclined') return 'Payment Declined';
  return '';
}


export default function ({id, testMode, isNewSignup}: { id: string, testMode: boolean, isNewSignup: boolean }) {

  const [signup, setSignup] = useState<Signup>();
  const [snack, setSnack] = useState<Snack>();
  const [badSignupId, setBadSignupId] = useState<string>();

  useEffect(() => {
    let _ignore: boolean = false;

    const database = firebase.database();
    const signupRef = database.ref('signups/' + id);
    signupRef.on('value', snapshot => {
      if (snapshot === null) throw Error();
      if (!_ignore) {
        const signup = snapshot.val();
        if (!signup) {
          setBadSignupId(id);
        } else {
          if (signup.test === null || signup.test === undefined) {
            signup.test = false;
          }
          signup.id = id;
          setSignup(signup);
        }
      }
    });
    return () => {
      _ignore = true;
    };
  }, [id]);

  //runs 4 seconds after "Payment accepted" msg and "thank you for signing up msg"
  const handleRequestCloseSnackbar = () => {
    setSnack(undefined);
  };

  const onCcComplete = (json: any) => {
    if (json.type === 'Ok') {
      if (!signup) throw Error();
      setSignup({...signup, paid: signup.price});
      setSnack('PaymentAccepted');
    } else {
      console.log('response', json);
      setSnack('PaymentDeclined');
    }
  };

  const onPayLinkClick = (event: any) => {
    event.preventDefault();
    window.document.body.scrollTop = 1000;
  };

  /**
   * In live mode, we use the token passed into this function.
   * In test mode we use:
   *    cc#:   "4242 4242 4242 4242"
   *    token: "tok_visa"
   */
  const onToken = (tokenGeneratedByStripe: Token) => {
    if (!signup) throw Error();
    const params: any = {
      token: testMode ? TEST_TOKEN : JSON.stringify(tokenGeneratedByStripe),
      signupId: id,
      email: signup.email,
      price: signup.price
    };
    console.log('params', params);
    const qs = ss.params(params);
    fetch(`${cfg.api}/charge`, {
      method: 'POST',
      body: qs,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(response => {
      response.json().then(json => {
        onCcComplete(json);
      });
    });
  };

  const emphColor = (emph: boolean) => emph ? 'red' : 'black';

  const field = (label: string, data: any, emph: boolean = false) => <Row>
    <Block width="10rem" padding=".3rem" margin=".3rem" background="#DDDDDD" color={emphColor(emph)} textAlign="right"
           fontStyle="italic">{label}:</Block>
    <Block width="30rem" padding=".3rem" margin=".3rem" color={emphColor(emph)}>{data}</Block>
  </Row>;

  if (badSignupId) return <Block margin="1rem">Bad signupId: {badSignupId}</Block>;
  if (!signup) return <div>Loading...</div>;


  const s: Signup = ensure(signup);

  const balance: number = s.price - s.paid;
  const hasBalance = balance > 0;

  const workshopKey: string = s.workshopKey;
  const date: LocalDate = s.date;

  const event: CEvent = service.loadEventSync(workshopKey, date);
  const workshop: CWorkshop = event.workshop;

  const d1 = event.startDateFormatted();
  const d2 = event.endDateFormatted();

  const isSnackbarOpen = snack !== undefined;
  const snackbarMsg = computeSnackbarMessage(snack);

  return (
    <Block>
      <CardHeader title="Signup Record"/>

      <Block padding="1rem">

        {testMode ?
          <Block color="red" marginBottom="1rem" fontWeight="bold" fontSize="1.5rem">SECRET TEST MODE</Block> : null}

        {isNewSignup ?
          <Block marginBottom="1rem" fontStyle="italic" color="red">Thank you. You are now registered. You should
            receive an email confirmation soon.</Block> : null}

        {hasBalance ? <Block marginBottom="1rem" fontStyle="italic ">
          Note: your seat is not guaranteed until payment is received.
          We accept payment by <a
          href="#payByCheck"
          onClick={onPayLinkClick}
        >check</a> or <a
          href="#payByCreditCard"
          onClick={onPayLinkClick}
        >credit card</a>.
        </Block> : <br/>
        }

        {field('Registration ID', s.id)}
        {field('Workshop', workshop.title)}
        {field('Days', workshop.days)}
        {field('Start Date', d1)}
        {field('End Date', d2)}
        {field('Email', s.email)}
        {field('Phone', s.phone)}
        {field('Name', s.name)}
        {field('Company', s.company)}
        {field('Price', '$' + String(s.price))}
        {field('Paid', '$' + String(s.paid))}
        {field('Balance', '$' + String(balance), hasBalance)}

        {hasBalance ?
          <Block>
            <Block>
              <CardHeader title="Pay by Credit Card"/>
              <Block paddingLeft="1rem">
                <CcPayment
                  workshopKey={workshopKey}
                  email={s.email}
                  testMode={testMode}
                  onToken={onToken}
                />
                <p>Or, if you prefer, you can pay by credit card over the <Lnk to="/contact">phone</Lnk>.</p>
              </Block>
            </Block>

            <Block>
              <CardHeader title="Pay by Check"/>
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

          : <br/>}

      </Block>
      <Snackbar
        open={isSnackbarOpen}
        message={snackbarMsg}
        autoHideDuration={4000}
        onClose={handleRequestCloseSnackbar}
      />

    </Block>
  );


}

