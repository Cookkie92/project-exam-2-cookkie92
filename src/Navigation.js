// Navigation.js
import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn }) => {
  // Retrieve the user's profile name from local storage
  const userProfile = localStorage.getItem("profileName");

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/profiles">Profiles</Link>
            </li>
            <li>
              {/* Link to the user's profile based on the profile name from local storage */}
              <Link to={`/profile/${userProfile}`}>Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
