import React, { useState, useEffect } from "react";
import axios from "axios";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // Get access token from localStorage
        const apiKey = localStorage.getItem("apiKey"); // Get API key from localStorage
        const response = await axios.get(
          "https://v2.api.noroff.dev/social/profiles",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include access token in Authorization header
              "X-Noroff-API-Key": apiKey, // Include API key in request headers
            },
          }
        );
        setProfiles(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Error fetching profiles");
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Profiles</h2>
      {profiles.map((profile) => (
        <div key={profile.name}>
          <h3>{profile.name}</h3>
          <p>{profile.bio}</p>
          {/* You can add more profile details here */}
        </div>
      ))}
    </div>
  );
};

export default Profiles;
