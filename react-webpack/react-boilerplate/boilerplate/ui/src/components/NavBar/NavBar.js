import React, { Fragment } from "react";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/counter">Counter</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/fetch">Fetch</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
