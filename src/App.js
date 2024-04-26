// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home"; // Import the new homepage component
import Navigation from "./Navigation"; // Import the navigation component
import "./buttonStyles.css"; // Import the buttonStyles.css file

const App = () => {
  return (
    <Router>
      <div>
        <Navigation /> {/* Render the navigation component */}
        <h1>Social Media App</h1>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route for the homepage */}
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
