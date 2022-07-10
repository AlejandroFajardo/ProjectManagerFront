import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBarClient from "../NavBarClient/NavBarClient";
import RegisterAdmon from "../UserComponents/RegisterAdmon";
import UserActivities from "../UserComponents/UserActivities";
import { Link } from "react-router-dom";
import logo from "../assets/client.jpg";
import Advance from "../UserComponents/Advance";
function PagesClient() {
  return (
    <>
      <NavBarClient />

      <div className="container">
        <Routes>
          <Route path="/" exact element={<RegisterAdmon replace />} />
          <Route path="Activities" exact element={<UserActivities replace />} />
          <Route path="advance" exact element={<Advance />} />
        </Routes>
      </div>
    </>
  );
}
export default PagesClient;
