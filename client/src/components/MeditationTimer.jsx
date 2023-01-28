import React, { Component } from "react";

class MeditationTimer extends Component {
  render() {
    return(
      <>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <button className="border btn btn-lg text-white m-4">Meditate</button>
        </div>
      </>
    );
  }
};

export default MeditationTimer;
