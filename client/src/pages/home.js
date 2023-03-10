import React from "react";
import { Link } from "react-router-dom";
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
          className="container d-flex flex-column align-items-center mb-5"
        >
          <div className="display-3 mb-5">
            Hey, welcome to{" "}
            <span id="app-text-logo" className="">
              myself
            </span>
            .
          </div>
        </div>

        <ul className="nav d-flex flex-row justify-content-center align-items-center px-5 pb-5">
          <li className="nav-link">
            <Link to="/meditate" className="unstyled-link">
              <div className="home-link home-link-meditate rounded-circle d-flex justify-content-center align-items-center">
                meditate
              </div>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/stretch" className="unstyled-link">
              <div className="home-link home-link-stretch rounded-circle d-flex justify-content-center align-items-center">
                stretch
              </div>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/quotes" className="unstyled-link">
              <div className="home-link home-link-quotes rounded-circle d-flex justify-content-center align-items-center">
                quotes
              </div>
            </Link>
          </li>
        </ul>

        <h4 className="">
          Tap one of these <span id="app-text-logo">activities</span> to get
          started.
        </h4>
      </div>
    </>
  );
};

export default Home;
