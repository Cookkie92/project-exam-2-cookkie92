// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import ProfilePage from "./ProfilePage"; // Import the ProfilePage component
import Navigation from "./Navigation";
import "./buttonStyles.css";
import Posts from "./posts";

const App = () => {
  // Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Navigation isLoggedIn={isLoggedIn} />{" "}
        {/* Pass isLoggedIn state to Navigation */}
        <h1>Social Media App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />{" "}
          {/* Pass setIsLoggedIn to Login */}
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} />}
          />{" "}
          {/* Pass setIsLoggedIn to Logout */}
          <Route
            path="/profile/:profileName"
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
        <Posts />
      </div>
    </Router>
  );
};

export default App;
