import React, { Component } from "react";
//import React, { useState } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [{ name: "Steven", age: 52 }],
  };

  switchNameHandler = (name, age) => {
    console.log(this);
    this.setState({ persons: [{ name, age }] });
  };

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        {
          name: event.target.value,
          age: 6,
        },
      ],
    });
  };
  // arrow function will not introduce a scope so "this" will be pointing to App class
  testScope() {
    console.log(this);
  }

  // class property by default will have “this” point to “undefined”
  // as a new scope is introduced
  testScope2 = () => console.log(this);

  render() {
    // inline styling
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
    };

    return (
      <div className="App">
        <h1> Hello World!</h1>
        {/* The bind() method creates a new function that, when called, 
            has its this keyword set to the provided value, 
            with a given sequence of arguments preceding any provided 
            when the new function is called. */}
        {/* in this case, You provide the definition of the function along 
            with the parameters you want to pass to it when it's called.
            This function is called when the button is clicked  
            */}
        <button
          style={style}
          onClick={this.switchNameHandler.bind(this, "Arlo", 6)}
        >
          Switch Name
        </button>
        <button style={style} onClick={this.testScope}>
          Test Scope - Undefined
        </button>
        <button style={style} onClick={this.testScope2}>
          Test Scope 2 - Class
        </button>

        {/* Pass methods as properties */}
        {/* Alternatively, you can use arrow function to implicitly 
            return the definition of the function  */}
        {/* TODO: Find out why there might be a potential performance hit  */}

        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={() => this.switchNameHandler("Arlo!", 6)}
          changed={this.nameChangedHandler}
        >
          Learning React
        </Person>
      </div>
    );
  }
}

/*
const App = (props) => {
  // you can have many useState calls to setup different states as needed
  const [personsState, setPersonsState] = useState({
    persons: [{ name: "Steven", age: 52 }],
  });

  const switchNameHandler = () => {
    // this will replace the entire state object - not merge the changes to it
    setPersonsState({ persons: [{ name: "Arlo", age: 6 }] });
  };

  return (
    <div className="App">
      <h1> Hello World!</h1>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person
        name={personsState.persons[0].name}
        age={personsState.persons[0].age}
      >
        Learning React
      </Person>
    </div>
  );
};
*/

export default App;
