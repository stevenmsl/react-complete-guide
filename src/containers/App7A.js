import React, { Component } from "react";
// - comparing to the styled-components approach (App5A) for scoping CSS,
//   this approach (CSS Module) allows you want to put all the CSS settings the file to
//   take the advantage the help of the editor
// - the extension has to be module.css

import classes from "./App7A.module.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import Aux from "../hoc/Auxiliary";
import withClass2 from "../hoc/withClass2";
import AuthContext from "../context/auth-context";

class App7A extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      { id: 1, name: "Steven", age: 52 },
      { id: 2, name: "Arlo", age: 6 },
      { id: 3, name: "Arlo2", age: 6 },
    ],
    showPersons: false,
    changeCounter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextPros, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  // make sure "this" is pointing to App class
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // setState might appear to be synchronous but it’s not.
    // React will update the state when it has some cycles.
    // So if you are depending on the current state to make a change
    // you can’t just access it and then change it as there is no
    // guarantee that the state is up to date.
    // It’s not safe.
    // This is wrong:
    // this.setState({
    //   persons,
    //   changeCounter: this.state.changeCounter + 1,
    // });

    this.setState((prevState, props) => {
      return {
        persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    //  updating state immutably
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log("[App.js] render");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }
    return (
      <Aux>
        <AuthContext.Provider
          // value can include the state of this component
          // or anything you want the child components at
          // any level to have access to
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler,
          }}
        >
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
            login={this.loginHandler}
          />
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

// HOC second approach - pass the component to a regular java script function,
// which in turns will return a functional component with added additional logic
export default withClass2(App7A, classes.App);
