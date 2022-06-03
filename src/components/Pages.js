import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import CreateUser from "./CreateUser/CreateUser";
import Proyect from "./Proyect/Proyect";

export default function Page() {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/createUser" exact element={<CreateUser />} />
      <Route path="/proyect" exact element={<Proyect />} />
    </Routes>
  );
}
