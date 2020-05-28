import ReactGA from 'react-ga';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './WorkshopDetail.css';
import * as firebase from 'firebase/app';
import 'firebase/database';


ReactGA.initialize('UA-99576717-1');

const config = {
  apiKey: 'AIzaSyD7V3jY16HarLDDVv1zMglUdrGbrgvUpC8',
  authDomain: 'tc-web-3362e.firebaseapp.com',
  databaseURL: 'https://tc-web-3362e.firebaseio.com',
  projectId: 'tc-web-3362e',
  storageBucket: 'tc-web-3362e.appspot.com',
  messagingSenderId: '477164933504'
};

firebase.initializeApp(config);

function render() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  const rootDiv = document.getElementById('root');
  ReactDOM.render(<App/>, rootDiv);
}

render();
window.addEventListener('popstate', e => {
  render();
});