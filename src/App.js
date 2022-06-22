import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import Pages from "./components/Pages.js";
import { Route, Switch } from "react-router-dom";
import NavBar from './components/Header/NavBar.js';

function App() {
  document.title = "P-WorkFlow"
  return (
  
    <div className="App">
      <Router>
      <NavBar />
      <Pages />
      </Router>
    </div>
    
  );
}

export default App;

