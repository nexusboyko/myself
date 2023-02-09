import React from "react";

function Stretch(props) {
  return (
    <>
      <div id={props.id} draggable onDragStart={e => props.handleOnDrag(e, props.id)} className="col-md-3 quote-card rounded-3 p-3">
        {props.id}
      </div>
    </>
  );
}

export default Stretch;