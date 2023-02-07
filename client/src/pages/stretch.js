import React from "react";
import StretchView from "../components/Stretch/StretchView";

const Stretch = () => {
  return (
    <>
      <div className="container p-0">
        <div className="display-6 mb-5 text-center">stretch</div>
        <div className="stretch rounded-5 p-4">
          <StretchView />
        </div>
      </div>
    </>
  );
};

export default Stretch;
