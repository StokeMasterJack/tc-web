import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import './index.css';

injectTapEventPlugin();

import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyD7V3jY16HarLDDVv1zMglUdrGbrgvUpC8",
  authDomain: "tc-web-3362e.firebaseapp.com",
  databaseURL: "https://tc-web-3362e.firebaseio.com",
  projectId: "tc-web-3362e",
  storageBucket: "tc-web-3362e.appspot.com",
  messagingSenderId: "477164933504"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
