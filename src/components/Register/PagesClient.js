import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBarClient from "../NavBarClient/NavBar.js";

import Activity from "../Activity/Activity.js";
import { Link } from "react-router-dom";
import logo from "../assets/client.jpg";

function Page() {
  return (
    <>
      <NavBarClient />
      <Link to="/" className="navbar-logo">
          <div className="logo">
            <img src={logo} alt="P-WorkFlow"   width="1000" height="570" />
          </div>
        </Link>

      <div className="container">
        <Routes>
          <Route path="/activity" exact element={<Activity/>} />
        </Routes>
      </div>
    </>
  );
}
export default Page;
