// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createApiKey } from "./auth"; // Import the createApiKey function

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://v2.api.noroff.dev/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login successful!");
      console.log(response.data);
      setSuccess(true);
      setError("");

      // Set isLoggedIn state to true
      setIsLoggedIn(true);

      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("profileName", response.data.data.name); // Save profile name

      // Create API key using access token
      const apiKey = await createApiKey(response.data.data.accessToken);

      localStorage.setItem("apiKey", apiKey); // Store API key

      // Redirect to the profile page
      navigate(`/profile/${response.data.data.name}`);
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setError(error.response.data.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="button" type="submit">
            Login
          </button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Login successful!</p>}
    </div>
  );
};

export default Login;
