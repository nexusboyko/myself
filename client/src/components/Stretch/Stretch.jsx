import React from "react";

function Stretch(props) {
  return (
    <>
      <div id={props.id} draggable onDragStart={e => props.handleOnDrag(e, props)} className="col-md-3 d-flex justify-content-between quote-card rounded-3 p-3">
        <p>{props.id}</p>
        <p>{props.name}</p>
      </div>
    </>
  );
}

export default Stretch;