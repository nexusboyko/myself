import React from "react";

const Quote = (props) => {
  return (
    <>
      <div className="border">
        <p>Quote: {props.text}</p>
        <p>Author: {props.author}</p>
        <small>Date: {new Date(props.dateCreated).toLocaleDateString()}</small>
      </div>
    </>
  );
}

export default Quote;