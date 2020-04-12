import React, { Component } from "react";
import PropTypes from "prop-types";
import Aux from "../../../hoc/Auxiliary";
import withClass2 from "../../../hoc/withClass2";
import classes from "./Person.module.css";

import AuthContext from "../../../context/auth-context";
//import classes from "./Person.module.css";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef2 = React.createRef();
  }

  // - second approach to consume the context in a class
  // - needs to be verbatim - contextType
  // - needs to be static
  // - React will give you access to the context through
  //   an automatically added property
  static contextType = AuthContext;

  componentDidMount() {
    // called after the render method.
    // should have access to the inputElement by then
    // ref approach 1
    // this.inputElement.focus();

    // ref approach 2
    this.inputElementRef2.current.focus();

    console.log(this.context.authenticated);
  }
  render() {
    console.log("[Person.js] rendering...");
    return (
      <Aux>
        <AuthContext.Consumer>
          {
            // - first approach to consume the context in a class
            // - get the data from the context instead of from
            //   the properties passing down from Persons
            // - this will prevent Persons from holding and passing
            //   down data itself doesn’t really need
            // - the limitation of this approach is that you can
            //   only access the context from where you are returning JSX elements
            (context) =>
              context.authenticated ? (
                <p>Authenticated!</p>
              ) : (
                <p>Please login</p>
              )
          }
        </AuthContext.Consumer>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p> {this.props.children}</p>
        <input
          // ref approach 1
          // ref={(inputEl) => {
          //   this.inputElement = inputEl;
          // }}

          // ref approach 2 -
          ref={this.inputElementRef2}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass2(Person, classes.Person);
