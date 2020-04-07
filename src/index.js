import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
// import App4 from "./App4";
// import App5 from "./App5";
// import App5A from "./App5A";
import App5B from "./App5B";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App5B />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
