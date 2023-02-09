import React, { useState }from "react";
import StretchContainer from "./StretchContainer";
import Stretch from "./Stretch";

const StretchView = () => {
  const [stretches, setStretches] = useState([]);

  function handleOnDrop(e) {
    const stretchType = e.dataTransfer.getData("stretchType");
    console.log(stretchType);
    setStretches([...stretches, stretchType]);
  }
  function handleOnDropBack(e) {
    const stretchType = e.dataTransfer.getData("stretchType");
    var currState = [...stretches]; 
    const i = currState.indexOf(stretchType);
    if (i !== -1) {
      currState.splice(i, 1);
      setStretches(currState);
    }
  }
  function handleOnDrag(e, stretchType) {
    e.dataTransfer.setData("stretchType", stretchType);    
  }
  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="container ">
        <div onDrop={handleOnDrop} onDragOver={handleDragOver} className="row glass-block rounded-3 p-4 mb-4">
          <h5 className="p-0 pb-3 m-0">My routine</h5>
          {stretches.map((stretch, i) => <Stretch id={stretch} key={i} handleOnDrag={handleOnDrag}/>)}
        </div>
      </div>

      <StretchContainer handleOnDropBack={handleOnDropBack} handleDragOver={handleDragOver} handleOnDrag={handleOnDrag} />      
      
    </>
  );
}

export default StretchView;