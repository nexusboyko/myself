import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="container">
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/meditate">meditate</Link>
          </li>
          <li>
            <Link to="/stretch">stretch</Link>
          </li>
          <li>
            <Link to="/quotes">quotes</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
