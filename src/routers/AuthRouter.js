import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/Login/Login";

const AuthRouter = ({setLoggedParameters}) => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="login" element={<Login setLoggedParameters/>} />

          <Route path="*" element={<Navigate to={"login"} replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AuthRouter;
