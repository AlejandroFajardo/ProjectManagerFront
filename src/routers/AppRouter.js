import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import Page from "../components/Pages";
import AuthRouter from "./AuthRouter";
import PagesClient from "../components/Register/PagesClient";

function AppRouter() {
  document.title = "P-WorkFlow";
  let isLoggedIn = false;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="auth/*"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <AuthRouter />
              </PublicRoute>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRoute isLoggedIn>
                <Page />
                {/* <PagesClient/>  */}
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to={"/auth/login"} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
