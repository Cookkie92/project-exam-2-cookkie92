import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        const response = await axios.get(
          `https://v2.api.noroff.dev/social/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );
        const postData = response.data.data;
        setTitle(postData.title);
        setBody(postData.body);
        setLoading(false);
      } catch (error) {
        setError("Error fetching post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      await axios.put(
        `https://v2.api.noroff.dev/social/posts/${postId}`,
        { title, body },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );
      navigate(`/posts/${postId}`);
    } catch (error) {
      setError("Error updating post");
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      await axios.delete(`https://v2.api.noroff.dev/social/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      });
      navigate("/posts");
    } catch (error) {
      setError("Error deleting post");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
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
        <button type="submit">Save Changes</button>
        <button onClick={handleDelete}>Delete Post</button>
      </form>
    </div>
  );
};

export default EditPost;
