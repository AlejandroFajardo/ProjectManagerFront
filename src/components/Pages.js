import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateUser from "./CreateUser/CreateUser";
import Project from "./Project/Project";
import ProjectList from "./Project/ProjectList";
import UserList from "./CreateUser/UserList";
import Activity from "./Activity/Activity";
import NavBar from "./NavBar/NavBar.js";

function Page() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/createUser" exact element={<CreateUser />} />
          <Route path="/userList" exact element={<UserList />} />
          <Route path="/proyect" exact element={<Project />} />
          <Route path="/proyectList" exact element={<ProjectList />} />
          <Route path="/actividad" exact element={<Activity />} />
        </Routes>
      </div>
    </>
  );
}
export default Page;
