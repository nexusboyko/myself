import React, { useState }from "react";
import { DndContext, closestCenter } from "@dnd-kit/core"
// import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import StretchContainer from "./StretchContainer";
import Stretch from "./Stretch";

const StretchView = () => {
  // const [stretches, setStretches] = useState(null);
  const [parent, setParent] = useState(null);
  const draggable = (
    <Stretch id="draggable">
      Drag this.
    </Stretch>
  )

  function handleDragEnd({over}) {
    setParent(over ? over.id : null);
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}> 
        <div className="container glass-block rounded-3 p-4 mb-4">
          <h5>Routine</h5>
          <StretchContainer id="droppable" className="border">
            {parent == "droppable" ? draggable : "Drop here."}
          </StretchContainer>
        </div>
        <div className="container glass-block rounded-3 p-4">
          <h5>My routines</h5>
          {!parent ? draggable : null}
        </div>
      </DndContext>
      
      
    </>
  );
}

export default StretchView;