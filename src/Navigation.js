import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/registration">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {isLoggedIn && ( // Render "Profile" link only if user is logged in
          <li>
            <Link to={`/profile/${localStorage.getItem("name")}`}>Profile</Link>
          </li>
        )}
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
