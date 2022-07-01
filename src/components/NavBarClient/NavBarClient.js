import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "./NavItemsClient";
import Dropdown from "./DropdownClient";

function NavBar() {
  const [dropDown, setDropdown] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <div className="logo">
          <img src={logo} alt="P-WorkFlow" width="200" />
        </div>
      </Link>
      <nav>
        <h1>
          <label className="HomeLabel"> Bienvenido: </label>
        </h1>
      </nav>
      <ul className="nav-items">
        {navItems.map((item) => {
          if (item.title === "Actividad") {
            return (
              <li
                key={item.id}
                className={item.cName}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <Link to={item.path}>{item.title}</Link>
                {dropDown && <Dropdown />}
              </li>
            );
          }

          return (
            <li key={item.id} className={item.cName}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
