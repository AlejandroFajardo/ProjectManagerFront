import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./Login/Login";
import CreateUser from "./CreateUser/CreateUser";

export default function Page() {
  return (
      <Routes>
        <Route path="/login" exact element={<Login/>} />
        <Route path="/createUser" exact element={<CreateUser/>} />
			</Routes>
  );  
}
