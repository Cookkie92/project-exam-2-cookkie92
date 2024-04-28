// CreatePosts.js
import React, { useState } from "react";
import axios from "axios";

const CreatePosts = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      const response = await axios.post(
        "https://v2.api.noroff.dev/social/posts",
        {
          title: title.trim(),
          body: body.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );
      console.log("Post created:", response.data);
      // Reset the title, body, and loading state after successful creation
      setTitle("");
      setBody("");
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Error creating post: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default CreatePosts;
