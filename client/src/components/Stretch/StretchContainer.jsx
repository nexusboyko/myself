import React, { useState } from 'react';
import Stretch from "./Stretch";

function StretchContainer(props) {
  const [stretches, setStretches] = useState([
    {
      id: 1,
      name: "Scorpion"
    },
    {
      id: 2,
      name: "Quad"
    }
  ]);

  return (
    <div className="container">
        <div id="StretchContainer" onDrop={props.handleOnDropBack} onDragOver={props.handleDragOver} className="row glass-block rounded-3 p-4">
          <h5 className="p-0 pb-3 m-0">Stretches</h5>
          {stretches.map((stretch, i) => <Stretch key={i} id={stretch.id} name={stretch.name} handleOnDrag={e => props.handleOnDrag(e, stretch)} />)}
        </div>
      </div>
  );
}

export default StretchContainer;