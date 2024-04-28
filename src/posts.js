// Posts.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        const response = await axios.get(
          "https://v2.api.noroff.dev/social/posts",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );
        console.log("Posts data:", response.data);
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <Link to="/CreatePosts">
        <button>Create Post</button>
      </Link>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
