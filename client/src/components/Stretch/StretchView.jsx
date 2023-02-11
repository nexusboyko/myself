import React, { useState }from "react";
import StretchContainer from "./StretchContainer";
import Stretch from "./Stretch";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const StretchView = () => {
  const [stretches, setStretches] = useState([]);

  // adding to routine
  function handleOnDrop(e) {
    const stretch = e.dataTransfer.getData("stretch");
    setStretches([...stretches, stretch]);
  }
  // removing by placing back in list
  function handleOnDropBack(e) {
    const stretch = e.dataTransfer.getData("stretch");
    var currState = [...stretches]; 
    const i = currState.indexOf(stretch);
    if (i !== -1) {
      currState.splice(i, 1);
      setStretches(currState);
    }
  }
  // dragging
  function handleOnDrag(e, stretch) {
    e.dataTransfer.setData("stretch", JSON.stringify(stretch));
  }
  function handleDragOver(e) {
    e.preventDefault();
  }

  const [listRef] = useAutoAnimate();

  return (
    <>
      <div className="container">
        <div onDrop={handleOnDrop} onDragOver={handleDragOver} className="row glass-block rounded-3 p-4 mb-4" ref={listRef}>
          <h5 className="p-0 pb-3 m-0">My routine</h5>
          {stretches.map((stretch, i) => {
            const stretchObject = JSON.parse(stretch);
            return (<Stretch key={i} id={stretchObject.id} name={stretchObject.name} handleOnDrag={handleOnDrag}/>);
          })}
        </div>
      </div>

      <StretchContainer handleOnDropBack={handleOnDropBack} handleDragOver={handleDragOver} handleOnDrag={handleOnDrag} />      
      
    </>
  );
}

export default StretchView;