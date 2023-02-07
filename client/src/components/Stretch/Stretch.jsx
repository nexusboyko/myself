import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";


function Stretch(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <>
      <div ref={setNodeRef} style={style} {...listeners} {...attributes} maxWidth={"45px"} className="border">
        {props.children}
      </div>
    </>
  );
}

export default Stretch;