import React from 'react';
import {Header} from"./components/Header/Header.js";
import { BrowserRouter as Router} from "react-router-dom";
import Pages from "./components/Pages.js";
import { Route, Switch } from "react-router-dom";
// import Navbar from './components/Nav2/Navbar.js';
// import NavBar from './components/NavBar/NavBar.js';
import NavBar from './components/Header/NavBar.js';

function App() {
  document.title = "P-WorkFlow"
  return (
  
    <div className="App">
      <Router>
      {/* <Header/> */}
      <NavBar />
      {/* <Navbar /> */}
      <Pages />
      </Router>
    </div>
    
  );
}

export default App;

