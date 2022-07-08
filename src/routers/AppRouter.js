import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import Page from "../components/Pages";
import AuthRouter from "./AuthRouter";
import PagesClient from "../components/Register/PagesClient";
import Cookies from 'universal-cookie';

function AppRouter() {
  document.title = "P-WorkFlow";
  let isLoggedIn = true;
  let isAdmin = true;
  const cookies = new Cookies();

  // console.log("Cookie de admin: " + cookies.get('isAdmin'));

  function setLoggedParameters() {
    isLoggedIn = cookies.get('isLogged');
    isAdmin = cookies.get('isAdmin');
  }

  // setLoggedParameters();

  console.log("Cookie de islogged: " + cookies.get('isLogged'));
  console.log("Cookie de admin: " + cookies.get('isAdmin'));

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
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Page />
                </PrivateRoute>
              ) : (
                <PrivateRoute isLoggedIn={isLoggedIn}>
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
