//ProfilePage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ProfilePage = () => {
  const { profileName } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        const response = await axios.get(
          `https://v2.api.noroff.dev/social/profiles/${profileName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );
        setProfile(response.data.data);
        setLoadingProfile(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data");
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, [profileName]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        const response = await axios.get(
          `https://v2.api.noroff.dev/social/posts?_author=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );
        setPosts(
          response.data.data.filter((post) => post.author.id === profile.id)
        ); // Filter posts by author's profile
        setLoadingPosts(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts");
        setLoadingPosts(false);
      }
    };

    if (profile) {
      fetchPosts();
    }
  }, [profile]);

  if (loadingProfile) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>Error: Profile not found</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <h3>Name: {profile.name}</h3>
        <img src={profile.avatar.url} alt={profile.avatar.alt} />
        <img src={profile.banner.url} alt={profile.banner.alt} />
      </div>
      <h2>Posts</h2>
      {loadingPosts ? (
        <div>Loading posts...</div>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
