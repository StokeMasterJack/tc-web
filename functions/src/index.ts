import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import {Transporter} from 'nodemailer';

import {CEvent, Signup} from 'types';
import {ensure} from 'util/ass';
import * as service from 'service';

console.log('ss:tcWeb init 1');

export type LocalDate = string;     //YYYY-MM-DD


export interface Eval {
  date: LocalDate;
  name: string;
  workshop: string;
  love: string;
  hate: string;
}


function initCloudFunctions() {
  admin.initializeApp(functions.config().firebase);
}

function initMailer(): Transporter {
  const gmailEmail = encodeURIComponent('dford@smart-soft.com');
  const gmailPassword = encodeURIComponent('9805indian*&^');
  return nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`
  );
}

function buildHtmlEvalEmail(v: Eval): string {
  // noinspection HtmlDeprecatedAttribute
  return `<table border='1' cellpadding='5'>
  <tr><td><b>Date:</b><td>${v.date}</td></tr>
  <tr><td><b>Workshop:</b></td><td>${v.workshop}</td></tr>    
  <tr><td><b>Name:</b><td>${v.name}</td></tr>    
  <tr><td><b>Like Most:</b></td><td>${v.love}</td></tr>    
  <tr><td><b>Like Least:</b></td><td>${v.hate}</td></tr>
</table>`;
}


function buildHtmlSignupEmail(signup: Signup): string {

  function field(label: String, data: string | number): string {

    return `
      <div style = "display:flex;flex-direction:row">
          <div style = "width:10rem;padding:.3rem;margin:.3rem;background:#DDDDDD;text-align:right;font-style:italic">
          ${label}
          </div>
          <div style = "width:30rem;padding:.3rem;margin:.3rem;">
          ${data}
          </div>
      </div>`;

  }

  const event: CEvent = service.loadEventSync(signup.workshopKey, signup.date);


  return `<div style="font-family: arial,serif" >
        <div style="padding:.3rem">
            <img src="https://smart-soft.com/static/media/ss-logo-transparent-2.a891149e.png" alt="Smart Soft Logo"/>
            <p style="margin-bottom:1rem;margin-top:2rem">Thank you. You are now registered.</p>
            <p style="margin-bottom:1rem;">
                <span style="font-style:italic;color:red">Note that your seat is not guaranteed until payment is received.&nbsp;</span>
                You can pay and view your on-line signup confirmation at: 
                <br/><br/>
                <a href="https://smart-soft.com/signupRecord/${signup.id}">https://smart-soft.com/signupRecord/${signup.id}</a>
            </p>
        </div>
            ${field('Registration ID', ensure(signup.id))}
            ${field('Workshop', event.workshop.title)}
            ${field('Days', event.workshop.days.toString())}
            ${field('Start Date', event.startDateFormatted())}
            ${field('End Date', event.endDateFormatted())}
            ${field('Email', signup.email)}
            ${field('Phone', signup.phone)}
            ${field('Name', signup.name)}
            ${field('Company', signup.company)}
            ${field('Price', '$' + signup.price.toString())}
            ${field('Paid', '$' + signup.paid.toString())}
            ${field('Balance', '$' + signup.balance.toString())}
      <div style="padding:.3rem">
      
       <p>If you have any questions please feel free to reply to this email.</p>

       <p>Thanks again for signing for my workshop.</p>
       <p>Dave Ford<br/><a href="https://smart-soft.com">Smart Soft</a></p>
      
      </div>
</div>`;
}

initCloudFunctions();
const t: Transporter = initMailer();


function sendEvalEmail(t: Transporter, html: string) {

  const mailOptions = {
    from: '"David Ford" <dford@smart-soft.com>',
    to: '"David Ford" <dford@smart-soft.com>',
    subject: 'Smart Soft Eval',
    html: html
  };

  t.sendMail(mailOptions).then(() => {
    console.log('Eval emailed');
  });

}

function sendSignupEmail(t: Transporter, signup: Signup, html: string) {

  const mailOptions = {
    from: '"David Ford" <dford@smart-soft.com>',
    cc: '"David Ford" <dford@smart-soft.com>',
    to: `"${signup.name}" <${signup.email}>`,
    subject: 'Smart Soft Signup Confirmation',
    html: html
  };

  t.sendMail(mailOptions).then(() => {
    console.log('Signup emailed');
  });

}

const onEvalCreate = (snapshot: functions.database.DataSnapshot) => {
  console.log('onEvalCreate');
  const tcEval: Eval = snapshot.val();
  const html = buildHtmlEvalEmail(tcEval);
  sendEvalEmail(t, html);
};

const onSignupCreate = (snapshot: functions.database.DataSnapshot) => {
  console.log('onSignupCreate');
  const tcSignup: Signup = snapshot.val();
  const html = buildHtmlSignupEmail(tcSignup);
  sendSignupEmail(t, tcSignup, html);
};


// noinspection JSUnusedGlobalSymbols
export const tcEvalTrigger = functions.database.ref('/evals/{uid}').onCreate(onEvalCreate);

// noinspection JSUnusedGlobalSymbols
export const tcSignupTrigger = functions.database.ref('/signups/{uid}').onCreate(onSignupCreate);

console.log('ss:tcWeb init complete!');