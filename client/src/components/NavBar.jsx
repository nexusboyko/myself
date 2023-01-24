import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const page = useLocation().pathname;

  return (
    <>
      <nav className="container border p-2 mb-4">
        <ul className="d-flex justify-content-center align-items-center">
          <li className="">
            <Link to="/" className={`${page === "/" ? "active" : ""}`}>home</Link>
          </li>
          <li className="">
            <Link to="/meditate" className={`${page === "/meditate" ? "active" : ""}`}>meditate</Link>
          </li>
          <li className="">
            <Link to="/stretch" className={`${page === "/stretch" ? "active" : ""}`}>stretch</Link>
          </li>
          <li className="">
            <Link to="/quotes" className={`${page === "/quotes" ? "active" : ""}`}>quotes</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
