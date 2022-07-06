import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import Page from "../components/Pages";
import AuthRouter from "./AuthRouter";
import PagesClient from "../components/Register/PagesClient";
import Cookies from "universal-cookie";

const cookies = new Cookies();
// cookies.set("logged", false);
// cookies.set("isAdmin", false);

function AppRouter() {
  let isLoggedIn;
  let isAdmin ;
  document.title = "P-WorkFlow";
  
  // cookies.set("logged", true);
  // cookies.set("isAdmin", true);

  // let isLoggedIn = cookies.get("logged");
  // let isAdmin = cookies.get("isAdmin");
  // console.log(isLoggedIn, isAdmin);

 

  // let isLoggedIn = window.localStorage.getItem('admin');
  // let isAdmin = window.localStorage.getItem('logged');
  // console.log(isLoggedIn, isAdmin);

  // console.log("Cookie de admin: " + cookies.get('isAdmin'));

  function setLoggedParameters() {
    cookies.remove('isLogged')
    cookies.remove('isAdmin')
    let auxLogged = cookies.get("isLogged");
    let auxAdmin = cookies.get("isAdmin");
    console.log(cookies.get("isLogged"));
    console.log(cookies.get("isAdmin"));
    // let auxLogged = window.localStorage.getItem('logged');
    // let auxAdmin = window.localStorage.getItem('admin');
    isLoggedIn = (auxLogged === 'true');
    isAdmin = (auxAdmin === 'true');
  }

  setLoggedParameters();

  // console.log("Cookie de islogged: " + cookies.get('isLogged'));
  // console.log("Cookie de admin: " + cookies.get('isAdmin'));

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
