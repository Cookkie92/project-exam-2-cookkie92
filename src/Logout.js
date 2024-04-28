//Logout.js
import React from "react";

const Logout = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("apiKey");

    // Set isLoggedIn state to false
    setIsLoggedIn(false);

    // Redirect to the home page or login page

    window.location.href = "/"; // Redirect to the home page
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
