import React from 'react';
import {Header} from"./components/Header/Header.js";
import { BrowserRouter as Router} from "react-router-dom";
import Pages from "./components/Pages.js";


function App() {
  document.title = "P-WorkFlow"
  return (
  
    <div className="App">
      <Router>
      <Header/>
      <Pages />
      </Router>
    </div>
    
  );
}

export default App;

