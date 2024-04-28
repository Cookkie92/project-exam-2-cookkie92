//Registration.js
import React, { useState } from "react";
import axios from "axios";
import { createApiKey } from "./auth"; // Import the createApiKey function

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://v2.api.noroff.dev/auth/register",
        formData
      );
      console.log("Registration response:", response.data); // Log the registration response data

      // Check if the response contains accessToken
      if (response.status === 201 && response.data.data) {
        // Registration successful, proceed with login
        await loginUser(formData.email, formData.password);
      } else {
        throw new Error("Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.response?.data?.message || "Registration failed.");
      setSuccess(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const loginResponse = await axios.post(
        "https://v2.api.noroff.dev/auth/login",
        { email, password }
      );
      console.log("Login response:", loginResponse.data); // Log the login response data

      // Check if the login response contains accessToken
      if (loginResponse.status === 200 && loginResponse.data.data) {
        // Create API key using the access token from login response
        const apiKey = await createApiKey(loginResponse.data.data.accessToken);
        console.log("API Key:", apiKey); // Log the API key
        localStorage.setItem("apiKey", apiKey); // Store API key
        setSuccess(true);
        setError("");
      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed.");
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registration successful!</p>}
    </div>
  );
};

export default Registration;
