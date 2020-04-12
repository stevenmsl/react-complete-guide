import React, { useEffect, memo, useRef, useContext } from "react";
import classes from "./Cockpit.module.css";

import AuthContext from "../../context/auth-context";

// - the name of the component needs to be
// - capitalized to be able to use the React hooks
// - dependency list - only when the persons property is
//   changed will useEffect be executed. Use empty array
//   if you only want useEffect to run just once
function Cockpit(props) {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);
  // you can’t click the button here
  // as the ref hasn’t been setup yet
  // toggleBtnRef.current.click();
  useEffect(() => {
    console.log("[Cockpit.js] useEffect");
    // setTimeout(() => {
    //   alert("Saved data to cloud!");
    // }, 1000);
    // click the button after the component
    // has been rendered
    toggleBtnRef.current.click();
  }, [props.persons]);

  useEffect(() => {
    console.log("[Cockpit.js] 2nd useEffect");
    // this will be executed before the next update cycle begins
    return () => {
      // clean up resources such as timer here
      console.log("[Cockpit.js] cleanup work in 2nd useEffect");
    };
  });

  const assignedClasses = [];
  let btnClass = "";
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1> {props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>

      {
        // first approach to consume the context in a functional component
        // <AuthContext.Consumer>
        //   {(context) => <button onClick={props.login}>Log in</button>}
        // </AuthContext.Consumer>
      }
      {
        // second approach to consume the context in a functional component
      }
      <button onClick={authContext.login}>Log in</button>
    </div>
  );
}
// memo - Will only re-render if the inputs
// to this component have changed
export default memo(Cockpit);
