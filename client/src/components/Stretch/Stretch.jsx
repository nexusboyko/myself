import React from "react";

function DefaultStretch(props) {
  return (
    <>
      <div className="col-md-3 d-flex justify-content-between quote-card border border-0 rounded-3 p-3">
        <p>{props.id}</p>
        <p>{props.name}</p>
        <button className="btn border rounded-circle" onClick={() => props.stretchRemove(props.position)}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </>
  );
}

export default DefaultStretch;