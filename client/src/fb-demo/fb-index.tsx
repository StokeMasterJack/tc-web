import * as firebase from 'firebase/app';
import 'firebase/database';
import * as ReactDOM from 'react-dom';
import React from 'react';
import {FbApp} from './FbApp';

firebase.initializeApp({
  apiKey: 'AIzaSyD7V3jY16HarLDDVv1zMglUdrGbrgvUpC8',
  authDomain: 'tc-web-3362e.firebaseapp.com',
  databaseURL: 'https://tc-web-3362e.firebaseio.com',
  projectId: 'tc-web-3362e',
  storageBucket: 'tc-web-3362e.appspot.com',
  messagingSenderId: '477164933504'
});

const rootDiv = document.getElementById('root');
ReactDOM.render(<FbApp/>, rootDiv);