import React, { Component } from "react";
// - comparing to the styled-components approach (App5A) for scoping CSS,
//   this approach (CSS Module) allows you want to put all the CSS settings the file to
//   take the advantage the help of the editor
// - the extension has to be module.css

import classes from "./App.module.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import WithClass from "../hoc/WithClass";

class App extends Component {
  // RESOLVED: find out why this is called twice
  // This is because React.StrictMode is enabled
  // This only applies to development mode.
  // Lifecycles will not be double-invoked in production mode
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

    this.setState({
      persons,
    });
  };

  deletePersonHandler = (personIndex) => {
    //  updating state immutably
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
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

    // HOC first approach – wrap JSX elements inside a HOC component that sets extra styles
    return (
      <WithClass classes={classes.App}>
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
        />
        {persons}
      </WithClass>
    );
  }
}

export default App;
