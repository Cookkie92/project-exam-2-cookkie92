// import React, { useState } from "react";
// import axios from "axios"; // Import Axios for making HTTP requests
// import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
// import "./buttonStyles.css"; // Import the buttonStyles.css file

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate(); // useNavigate hook for redirection

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a POST request to the login endpoint
//       const response = await axios.post(
//         "https://v2.api.noroff.dev/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       // Handle successful login
//       console.log("Login successful!");
//       console.log(response.data); // Optionally, you can handle the response data here
//       setSuccess(true);
//       setError("");

//       // Redirect to the profile page after successful login
//       navigate("/profile"); // Use navigate function instead of history.push
//     } catch (error) {
//       // Handle login failure
//       console.error("Login failed:", error.response.data);
//       setError(error.response.data.message);
//       setSuccess(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="button-container">
//           <button className="button" type="submit">
//             Login
//           </button>{" "}
//           {/* Apply button styles */}
//         </div>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>Login successful!</p>}
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./buttonStyles.css"; // Import the buttonStyles.css file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the login endpoint
      const response = await axios.post(
        "https://v2.api.noroff.dev/auth/login",
        {
          email,
          password,
        }
      );

      // Handle successful login
      console.log("Login successful!");
      console.log(response.data); // Optionally, you can handle the response data here
      setSuccess(true);
      setError("");

      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(response.data.data));

      // Redirect to the profile page after successful login
      navigate("/profile"); // Use navigate function instead of history.push
    } catch (error) {
      // Handle login failure
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
          </button>{" "}
          {/* Apply button styles */}
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Login successful!</p>}
    </div>
  );
};

export default Login;
