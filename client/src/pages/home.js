import React from "react";
import logo from "../images/logo.svg"

const Home = () => {
  return (
    <>
      <div className="container nav d-flex align-items-center">
        <img src={logo} alt="logo" height={"30px"} className="me-2"/>
        <div className="display-6">myself</div>
      </div>
    </>
  );
};

export default Home;
