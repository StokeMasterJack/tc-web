import React, {useState} from 'react';
import {Block, Col} from 'jsxstyle';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import * as validator from 'email-validator';
import * as ss from './util/ssutil';
// import * as cfg from './cfg';
import {DWorkshop, Signup} from './types';

import * as firebase from 'firebase/app';
import 'firebase/database';
import * as service from './service';
import Button from '@material-ui/core/Button';

const style = {
  padding: '1rem'
};

const inputStyle = {
  width: '100%',
  marginBottom: '1rem'
};

// interface State {
//   signup: Signup,
//   isNew: boolean,
//   key: string
// }


const initSignup = (workshopKey: string, date: string) => {
  const today = moment().format('YYYY-MM-DD');
  const workshop: DWorkshop = service.loadWorkshopSync(workshopKey);
  return {
    name: '',
    company: '',
    phone: '',
    email: '',
    signupDate: today,
    workshopKey: workshopKey,
    date: date,
    price: workshop.price,
    paid: 0,
    balance: workshop.price
  };
};

const initErrors = (): Partial<Signup> => {
  return {
    name: '',
    company: '',
    phone: '',
    email: ''
  };
};

const sampleSignup = (workshopKey: string, date: string) => {
  const today = moment().format('YYYY-MM-DD');
  const workshop: DWorkshop = service.loadWorkshopSync(workshopKey);
  return {
    name: 'Dave Ford',
    company: 'Smart Soft',
    phone: '714 654 6550',
    email: 'dford@smart-soft.com',
    signupDate: today,
    workshopKey: workshopKey,
    date: date,
    price: workshop.price,
    paid: 0,
    balance:workshop.price
  };
};

export default function ({workshopKey, date}: { workshopKey: string, date: string }): JSX.Element {

  const [signup, setSignup] = useState<Signup>(initSignup(workshopKey, date));
  const [isNew, setIsNew] = useState<boolean>(true);
  // const [key, setKey] = useState<string>('');

  const onSubmit = (event: any) => {
    event.preventDefault();
    setIsNew(false);
    const ae = anyErrors();
    if (!ae) submitSignup();
  };

  const submitSignup = () => {
    const database = firebase.database();
    const signupsRef = database.ref('signups');
    const newSignupRef = signupsRef.push();
    const newKey = newSignupRef.key;
    if (!newKey) throw Error();

    // setKey(newKey);

    const url = '/signupRecord/' + newKey + '?isNewSignup=true';
    ss.spaRedir(url);

    newSignupRef.set(signup).then((_) => {
      // submitSignupEmail(key);
      //i turned off server
    });
  };

  // noinspection JSUnusedLocalSymbols
  // const submitSignupEmail = (newKey: string) => {
  //   const url = `${cfg.api}/signupEmail`;
  //   fetch(url, {
  //     method: 'POST',
  //     body: 'signupId=' + newKey,
  //     headers: {
  //       'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  //     }
  //   }).then(response => {
  //
  //     if (response.status !== 200) {
  //       console.log(`Error in submitSignupEmail see JS console for error message httpStatus[${response.status}]`);
  //     } else {
  //       const contentType = response.headers.get('content-type');
  //       const contentLength = response.headers.get('content-length');
  //       console.log('contentType', contentType);
  //       console.log('contentLength', contentLength);
  //       if (!contentType) {
  //         console.log('No contentType');
  //       } else if (contentType.includes('application/json')) {
  //         //this service is currently saying its OK 200 and application/json
  //         //   when its really this:
  //         /*
  //         <html>
  //         <head><title>502 Bad Gateway</title></head>
  //         <body bgcolor="white">
  //         <center><h1>502 Bad Gateway</h1></center>
  //         <hr><center>nginx/1.4.6 (Ubuntu)</center>
  //         </body>
  //         </html>
  //          */
  //       }
  //
  //       response.text().then(text => {
  //         console.log('Server Response: ');
  //         console.log(text);
  //       });
  //     }
  //
  //
  //   }).catch(error => console.error('Error in submitSignupEmail', error));
  // };

  const ch = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const copy = {...signup, [name]: value};
    setSignup(copy);
  };

  const dateRangeFormatted = (): string => {
    const d1 = moment(date);
    const d2 = moment(d1).add(4, 'days');
    return d1.format('ddd MMM D') + ' - ' + d2.format('ddd MMM D');
  };

  const anyErrors = (): boolean => {
    const e = errors();
    const eValues = Object.keys(e).map(key => (e as any)[key]);
    return eValues.some(v => !!v);
  };

  const errorsUI = () => {
    if (isNew) return initSignup(workshopKey, date);
    return errors();
  };

  const errors = (): Partial<Signup> => {
    const s: Signup = signup;
    const e: Partial<Signup> = initErrors();
    if (!s.name) e.name = 'Enter your Name';
    if (!s.company) e.company = 'Enter your Company Name';
    if (!s.phone) {
      e.phone = 'Enter your Phone Number';
    } else if (!ss.isValidPhoneNumber(s.phone)) {
      e.phone = 'Enter a valid Phone Number';
    }
    if (!s.email) {
      e.email = 'Enter your email';
    } else if (!validator.validate(s.email)) {
      e.email = 'Enter a valid email address';
    }
    return e;
  };

  const onSampleDataClick = (event: any) => {
    event.preventDefault();
    const ss = sampleSignup(workshopKey, date);
    setSignup(ss);
  };

  const render = () => {

    const errors = errorsUI();

    const headItemStyle = {
      margin: 0,
      padding: 0,
      paddingBottom: '.2rem'
    };

    const workshop = service.loadWorkshopSync(workshopKey);

    return (
      <Block>
        <CardHeader title="Smart Soft Signup Form"/>
        <Col alignItems="center">

          <Block width="40rem">

            <Card style={style}>
              <Block fontSize="1.2rem" marginBottom=".5rem"><b>{workshop.title}</b></Block>
              <div style={headItemStyle}>{workshop.subtitle}</div>
              <div style={headItemStyle}>{dateRangeFormatted()}</div>
              <div style={headItemStyle}>{ss.formatCurrency(workshop.price)}</div>
            </Card>
            <Block height="1rem" props={{onClick: onSampleDataClick}}>
              &nbsp;
            </Block>
            <Card style={style}>
              <form autoComplete="off">
                <TextField
                  autoFocus={true}
                  id="name"
                  name="name"
                  style={inputStyle}
                  label="Name"
                  value={signup.name}
                  onChange={ch}
                  error={!!errors.name}
                  variant={'outlined'}
                />
                <TextField
                  name="company"
                  style={inputStyle}
                  label="Company name"
                  value={signup.company}
                  onChange={ch}
                  error={!!errors.company}
                  variant={'outlined'}
                />

                <TextField
                  name="phone"
                  style={inputStyle}
                  label="Phone"
                  value={signup.phone}
                  onChange={ch}
                  error={!!errors.phone}
                  variant={'outlined'}
                />

                <TextField
                  name="email"
                  style={inputStyle}
                  label="Email"
                  value={signup.email}
                  onChange={ch}
                  error={!!errors.email}
                  variant={'outlined'}
                />

                <Button variant='outlined'
                        color={'primary'}
                        style={{width: '100%', marginTop: '1rem'}}
                        onClick={onSubmit}
                >Submit</Button>

              </form>
            </Card>
          </Block>
        </Col>

      </Block>
    );
  };

  return render();
}
