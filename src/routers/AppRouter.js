import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import Page from "../components/Pages";
import AuthRouter from "./AuthRouter";

function AppRouter() {
  document.title = "P-WorkFlow";
  let isLoggedIn = true;
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
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Page></Page>
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
