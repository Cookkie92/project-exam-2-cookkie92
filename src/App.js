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
import ProfilePage from "./ProfilePage";
import Navigation from "./Navigation";
import Posts from "./posts";
import Profiles from "./profiles";
import SingleProfile from "./SingleProfile";
import SinglePost from "./SinglePost";
import CreatePosts from "./CreatePosts";
import EditPost from "./EditPost"; // Import EditPost component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Navigation isLoggedIn={isLoggedIn} />
        <h1>Social Media App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/profile/:profileName"
            element={
              isLoggedIn ? <ProfilePage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profiles/:name" component={SingleProfile} />
          <Route path="/posts/:postId" element={<SinglePost />} />
          <Route path="/CreatePosts" element={<CreatePosts />} />
          <Route path="/posts/:postId/edit" element={<EditPost />} />{" "}
          {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
