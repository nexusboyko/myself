import React from "react";
import MeditateView from "../components/MeditateView"

const Meditate = () => {
  return (
    <>
      <div className="container p-0">
        <div className="display-6 mb-5 text-center">meditate</div>
        <div className="meditate rounded-5 p-4">
          <MeditateView />
          <div className="container glass-block rounded-3 p-4">
            <h5 className="text-white">My meditations</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meditate;
