import React from "react";
import logo from "../images/logo.svg";

const Home = () => {
  return (
    <>
      <div className="container nav d-flex flex-column align-items-center justify-content-center">
        <div id="hero-img-container" className="mb-5 p-5">
          <img src={logo} alt="logo" height={"50px"} />
        </div>

        <div
          id="hero-container"
          className="container d-flex flex-column align-items-center"
        >
          <div className="display-3 mb-5">
            Hey, welcome to{" "}
            <span id="app-text-logo" className="">
              myself
            </span>
            .
          </div>
        </div>

        <div className="container home row gap-3 rounded-5 p-4">
          {/* <div className="col-md-5 glass-block rounded-3 p-4">
            <h5 className="text-white">About</h5>
          </div>
          <div className="col-md-5 glass-block rounded-3 p-4">
            <h5 className="text-white">About</h5>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
