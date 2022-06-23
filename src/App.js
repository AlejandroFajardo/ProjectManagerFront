import React from "react";
import Header from "./components/Header/HeaderPrin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pages from "./components/Pages.js";
import Login from "./components/Login/Login";

function App() {
  document.title = "P-WorkFlow";
  return (
    <div className="App">
      <Router>
        <Pages />
      </Router>
    </div>
  );
}

export default App;
/*return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/page" element={<Pages />} />
        </Routes>
      </div>
    </Router>
  );*/
