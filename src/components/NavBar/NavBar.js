import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "./NavItems";
import Dropdown from "./DropdownProject";
import DropdownUser from "./DropdownUser";

function NavBar() {
  const [dropDown, setDropdown] = useState(false);
  const [dropDownUser, setDropdownUser] = useState(false);

  return (
   
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <div className="logo">
            <img src={logo} alt="P-WorkFlow" width="200" />
          </div>
        </Link>
        <ul className="nav-items">
          {navItems.map((item) => {
            if (item.title === "Proyecto") {
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
            if (item.title === "Usuarios") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownUser(true)}
                  onMouseLeave={() => setDropdownUser(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropDownUser && <DropdownUser />}
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
