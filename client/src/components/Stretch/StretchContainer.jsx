import React, { useState } from 'react';
import DefaultStretch from "./DefaultStretch";

function StretchContainer(props) {
  const [defaultStretches, setDefaultStretches] = useState([
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
        <div className="row glass-block rounded-3 p-4">
          <h5 className="p-0 pb-3 m-0">Stretches</h5>

          {defaultStretches.map((stretch, i) => {
            return (
              <DefaultStretch key={i} id={stretch.id} name={stretch.name} stretchAdd={props.stretchAdd}/>
            );
          })}

        </div>
      </div>
  );
}

export default StretchContainer;