import React from "react";

function DefaultStretch(props) {
  return (
    <>
      <button id={props.id} className="col-md-3 d-flex justify-content-between quote-card border border-0 rounded-3 p-3" onClick={() => props.stretchAdd(JSON.stringify({
        id: props.id,
        name: props.name
      }))}>
        <p>{props.id}</p>
        <p>{props.name}</p>
      </button>
    </>
  );
}

export default DefaultStretch;