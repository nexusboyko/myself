import React, { useEffect, useState }from "react";
import StretchContainer from "./StretchContainer";
import Stretch from "./Stretch";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const stretchesFromLocalStorage = JSON.parse(localStorage.getItem("stretches") || "[]");

const StretchView = () => {
  const [stretches, setStretches] = useState(stretchesFromLocalStorage);

  const [listRef] = useAutoAnimate();

  function stretchAdd(stretch) {
    const obj = {
      pos: stretches.length,
      ...JSON.parse(stretch)
    }
    setStretches([...stretches, obj]);
  }
  function stretchRemove(pos) {
    console.log(stretches.find(stretch => stretch.pos === pos));
    const i = stretches.findIndex(stretch => stretch.pos === pos);
    var currState = [...stretches];
    if (i !== -1) {
      currState.splice(i, 1);
      setStretches(currState);
    }
  }

  useEffect(() => {
    localStorage.setItem("stretches", JSON.stringify(stretches));
  }, [stretches]);

  return (
    <>
      <div className="container">
        <div className="row glass-block rounded-3 p-4 mb-4" ref={listRef}>
          <h5 className="p-0 pb-3 m-0">My routine</h5>
          {stretches.map((stretch, i) => {
            return (
              <Stretch key={i} id={i} position={stretch.pos} name={stretch.name} stretchRemove={stretchRemove}/>
            );
          })}
        </div>
      </div>

      <StretchContainer stretchAdd={stretchAdd} />      
      
    </>
  );
}

export default StretchView;