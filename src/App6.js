import React, { Component } from "react";
// - comparing to the styled-components approach (App5A) for scoping CSS,
//   this approach (CSS Module) allows you want to put all the CSS settings the file to
//   take the advantage the help of the editor
// - the extension has to be module.css

import classes from "./App6.module.css";
import Person from "./Person6/Person";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

class App6 extends Component {
  state = {
    persons: [
      { id: 1, name: "Steven", age: 52 },
      { id: 2, name: "Arlo", age: 6 },
      { id: 3, name: "Arlo2", age: 6 },
    ],

    showPersons: false,
  };

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
    let persons = null;

    let btnClass = "";
    if (this.state.showPersons) {
      // need to setup the key property so React can manage the list more efficiently
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              // - Error boundary only works in prod mode
              // - "key" needs to be set on the outermost component;
              //    move it up from Person to ErrorBoundary
              // - Use error boundary with discretion – only in the case
              //   where a component is excepted to throw errors unpredictably.
              //   Don’t clutter your code with error boundary.
              // - error boundary only works in prod mode
              <ErrorBoundary key={person.id}>
                <Person
                  click={() => this.deletePersonHandler(index)}
                  name={person.name}
                  age={person.age}
                  changed={(event) => this.nameChangedHandler(event, person.id)}
                />
              </ErrorBoundary>
            );
          })}
        </div>
      );
      btnClass = classes.Red;
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      // a unique class name will be generated such as App5B_App__2Tcuq
      <div className={classes.App}>
        <h1> Hello World!</h1>
        <p className={assignedClasses.join(" ")}>This is really working</p>
        {/* style: .App5B_App__2Tcuq button or .App5B_App__2Tcuq button.App5B_Red__2qS9p   */}
        <button className={btnClass} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App6;
