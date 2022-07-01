import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBarClient from "../NavBarClient/NavBarClient";
import RegisterAdmon from "../UserComponents/RegisterAdmon";
import UserActivities from "../UserComponents/UserActivities";
import { Link } from "react-router-dom";
import logo from "../assets/client.jpg";
import Progress from "../UserComponents/Progress";
function Page() {
  return (
    <>
      <NavBarClient />

      <div className="container">
        <Routes>
          <Route path="/" exact element={<RegisterAdmon replace />} />
          <Route
            path="/userActivities"
            exact
            element={<UserActivities replace />}
          />
          <Route path="/progress" exact element={<Progress />} />
        </Routes>
      </div>
    </>
  );
}
export default Page;
