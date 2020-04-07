import React from "react";
import styled from "styled-components";

// styled.div is just a function call that will return a component
// a CSS class with unique name will be generated
// and put in the header of the index html
const StyledDiv = styled.div`
  width: 60%;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;

  @media (min-width: 500px) {
    width: 450px;
  }
`;

const person = (props) => {
  return (
    <StyledDiv>
      <p onClick={props.click}>
        I'm {props.name} and I am {props.age} years old!
      </p>
      <p> {props.children}</p>
      {/* event will be passed to the changed method automatically by React  */}
      {/* two way binding pattern */}
      <input type="text" onChange={props.changed} value={props.name} />
    </StyledDiv>
  );
};

export default person;
