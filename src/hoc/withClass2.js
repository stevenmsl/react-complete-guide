import React from "react";

// - Just a regular java script function that would
//   return a functional component; itself is not
//   a functional component

// - start with a lower case letter for the function name
// - WrappedComponent is a reference to a component;
//   start the name with a upper case letter as we are going
//   to use it in JSX
const withClass2 = (WrappedComponent, className) => {
  // - return a functional component
  // - need to pass properties to the wrapped component
  // - Use spread operator to spread out the properties.
  //   If you just specify {props} and don’t spread it,
  //   all the properties will reside in props.props when
  //   they are passed down to the wrapped component
  return (props) => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withClass2;
