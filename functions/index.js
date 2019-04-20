const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.contentType = "application/json";
  const retVal = { a: 10, y: 20 };
  response.send(JSON.stringify(retVal));
});

exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push it into the Realtime Database then send a response
  admin
    .database()
    .ref("/messages")
    .push({ original: original })
    .then(snapshot => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      res.redirect(303, snapshot.ref);
    });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database
  .ref("/messages/{pushId}/original")
  .onWrite(event => {
    // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
    console.log("Uppercasing", event.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return event.data.ref.parent.child("uppercase").set(uppercase);
  });

// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent("dford@smart-soft.com");
const gmailPassword = encodeURIComponent("9805indian*&^");
const mailTransport = nodemailer.createTransport(
  `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`
);

exports.sendEvalEmail = functions.database
  .ref("/evals/{uid}")
  .onWrite(event => {
    const snapshot = event.data;
    const v = snapshot.val();

    const mailOptions = {
      from: '"David Ford" <dford@smart-soft.com>',
      to: '"David Ford" <dford@smart-soft.com>'
    };

    mailOptions.subject = "Smart Soft Eval";
    mailOptions.html = htmlEvalEmail(v);
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log("New Eval info sent");
    });
  });

const htmlEvalEmail = v => `<table border='1' cellpadding='5'>
  <tr><td><b>Date:</b><td>${v.date}</td></tr>
  <tr><td><b>Workshop:</b></td><td>${v.workshop}</td></tr>    
  <tr><td><b>Name:</b><td>${v.name}</td></tr>    
  <tr><td><b>Like Most:</b></td><td>${v.love}</td></tr>    
  <tr><td><b>Like Least:</b></td><td>${v.hate}</td></tr>
</table>`;
