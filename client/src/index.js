import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import App from "./App";
import "./index.css";
import * as firebase from "firebase/app";
import "firebase/database";

injectTapEventPlugin();

window.addEventListener("popstate", e => {
  render();
});

const config = {
  apiKey: "AIzaSyD7V3jY16HarLDDVv1zMglUdrGbrgvUpC8",
  authDomain: "tc-web-3362e.firebaseapp.com",
  databaseURL: "https://tc-web-3362e.firebaseio.com",
  projectId: "tc-web-3362e",
  storageBucket: "tc-web-3362e.appspot.com",
  messagingSenderId: "477164933504"
};
firebase.initializeApp(config);

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  );
}
render();