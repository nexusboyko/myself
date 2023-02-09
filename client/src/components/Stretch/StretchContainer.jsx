import React from 'react';
import Stretch from "./Stretch";

function StretchContainer(props) {

  return (
    <div className="container">
        <div id="StretchContainer" onDrop={props.handleOnDropBack} onDragOver={props.handleDragOver} className="row glass-block rounded-3 p-4">
          <h5 className="p-0 m-0">Stretches</h5>
          <Stretch id={1} handleOnDrag={props.handleOnDrag}/>
          <Stretch id={2} handleOnDrag={props.handleOnDrag}/>
        </div>
      </div>
  );
}

export default StretchContainer;