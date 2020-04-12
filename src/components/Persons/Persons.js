import React, { Component } from "react";
import Person from "./Person/Person";
class Persons extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Persons.js] getDerivedStateFromProps");
  //   return state;
  // }

  // update life cycle

  // legacy – will be deprecated soon
  // componentWillReceiveProps(props) {
  //   console.log("[Persons.js] componentWillReceiveProps", props);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Persons.js] shouldComponentUpdate");
    // - Comparing the reference – this works because
    //   every time there is any change made a new array
    //   will be re-created and hence the reference will
    //   be different from before
    // - If you need to compare multiple properties (click, changed, ...) ,
    //   consider extending from Pure Component instead
    if (nextProps.persons !== this.props.persons) {
      return true;
    } else {
      return false;
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    // This can then be accessed later
    // in the component did update method
    return { message: "Snapshot!" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js] componentDidUpdate");
    console.log(snapshot);
  }

  // cleanup

  componentWillUnmount() {
    console.log("[Persons.js] componentWillUnmount");
  }

  // cleanup - end

  render() {
    console.log("[Persons.js] rendering...");
    // You don’t need to consume the context here in Persons.
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    });
  }
}
export default Persons;
