import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="container">
        <ul className="navbar">
          <li className="nav-link">
            <Link to="/">home</Link>
          </li>
          <li className="nav-link">
            <Link to="/meditate">meditate</Link>
          </li>
          <li className="nav-link">
            <Link to="/stretch">stretch</Link>
          </li>
          <li className="nav-link">
            <Link to="/quotes">quotes</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
