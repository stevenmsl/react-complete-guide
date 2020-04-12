import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
// import App4 from "./App4";
// import App5 from "./App5";
// import App5A from "./App5A";
// import App5B from "./App5B";
// import App6 from "./App6";
// import App7 from "./containers/App";
import App7A from "./containers/App7A";
import * as serviceWorker from "./serviceWorker";

/*
  It is expected that setState updaters will run twice in strict mode in development. 
  This helps ensure the code doesn't rely on them running a single time
  (which wouldn't be the case if an async render was aborted and alter restarted). 
  If your setState updaters are pure functions (as they should be) then 
  this shouldn't affect the logic of your application.
*/

// ReactDOM.render(
//   <React.StrictMode>
//     <App7 appTitle="Person Manager" />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <App7A appTitle="Person Manager" />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
