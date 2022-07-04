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
  let isAdmin = true;

  // function setLoggedParameters(isLogged, isTheAdmin) {
  //   isLoggedIn = isLogged;
  //   isAdmin = isTheAdmin;
  // }
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
              isAdmin ? (
                <PrivateRoute isLoggedIn>
                  <Page />
                </PrivateRoute>
              ) : (
                <PrivateRoute isLoggedIn>
                  <PagesClient />
                </PrivateRoute>
              )
            }
          />

          <Route path="*" element={<Navigate to={"/auth/login"} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
