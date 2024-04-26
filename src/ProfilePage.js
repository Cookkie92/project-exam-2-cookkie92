// // ProfilePage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [newAvatar, setNewAvatar] = useState(null);
//   const [newBanner, setNewBanner] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   // Fetch profile data when component mounts
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         // Retrieve access token from local storage or cookie after successful login
//         const token = localStorage.getItem("accessToken"); // Example: JWT token

//         // Make authenticated request with token in headers
//         const response = await axios.get(
//           "https://v2.api.noroff.dev/social/profiles/my_profile_name",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include token in Authorization header
//             },
//           }
//         );
//         setProfile(response.data.data);
//       } catch (error) {
//         setError("Error fetching profile data");
//       }
//     };

//     fetchProfileData();
//   }, []);

//   // Function to handle avatar file selection
//   const handleAvatarChange = (e) => {
//     setNewAvatar(e.target.files[0]);
//   };

//   // Function to handle banner file selection
//   const handleBannerChange = (e) => {
//     setNewBanner(e.target.files[0]);
//   };

//   // Function to update profile
//   const updateProfile = async () => {
//     const formData = new FormData();
//     if (newAvatar) {
//       formData.append("avatar", newAvatar);
//     }
//     if (newBanner) {
//       formData.append("banner", newBanner);
//     }

//     try {
//       const response = await axios.put(
//         "https://v2.api.noroff.dev/social/profiles/my_profile_name",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include token in Authorization header
//           },
//         }
//       );
//       setProfile(response.data.data);
//       setSuccess(true);
//     } catch (error) {
//       setError("Error updating profile");
//     }
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Profile</h2>
//       <div>
//         <h3>Name: {profile.name}</h3>
//         <img src={profile.avatar.url} alt={profile.avatar.alt} />
//         <input type="file" accept="image/*" onChange={handleAvatarChange} />
//         <img src={profile.banner.url} alt={profile.banner.alt} />
//         <input type="file" accept="image/*" onChange={handleBannerChange} />
//         <button onClick={updateProfile}>Update Profile</button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// ProfilePage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [newAvatar, setNewAvatar] = useState(null);
//   const [newBanner, setNewBanner] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         // Retrieve access token from local storage after successful login
//         const token = localStorage.getItem("accessToken");

//         // Check if access token is available
//         if (!token) {
//           throw new Error("Access token not found");
//         }

//         // Make authenticated request with token in headers
//         const response = await axios.get(
//           "https://v2.api.noroff.dev/social/profiles/my_profile_name",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setProfile(response.data.data);
//       } catch (error) {
//         setError("Error fetching profile data");
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleAvatarChange = (e) => {
//     setNewAvatar(e.target.files[0]);
//   };

//   const handleBannerChange = (e) => {
//     setNewBanner(e.target.files[0]);
//   };

//   const updateProfile = async () => {
//     const formData = new FormData();
//     if (newAvatar) {
//       formData.append("avatar", newAvatar);
//     }
//     if (newBanner) {
//       formData.append("banner", newBanner);
//     }

//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         throw new Error("Access token not found");
//       }

//       const response = await axios.put(
//         "https://v2.api.noroff.dev/social/profiles/my_profile_name",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setProfile(response.data.data);
//       setSuccess(true);
//     } catch (error) {
//       setError("Error updating profile");
//     }
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Profile</h2>
//       <div>
//         <h3>Name: {profile.name}</h3>
//         <img src={profile.avatar.url} alt={profile.avatar.alt} />
//         <input type="file" accept="image/*" onChange={handleAvatarChange} />
//         <img src={profile.banner.url} alt={profile.banner.alt} />
//         <input type="file" accept="image/*" onChange={handleBannerChange} />
//         <button onClick={updateProfile}>Update Profile</button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [newBanner, setNewBanner] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(
          "https://v2.api.noroff.dev/social/profiles/my_profile_name",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error); // Log error to console
        setError("Error fetching profile data");
      }
    };

    fetchProfileData();
  }, []);

  const handleAvatarChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  const handleBannerChange = (e) => {
    setNewBanner(e.target.files[0]);
  };

  const updateProfile = async () => {
    const formData = new FormData();
    if (newAvatar) {
      formData.append("avatar", newAvatar);
    }
    if (newBanner) {
      formData.append("banner", newBanner);
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Access token not found");
      }

      const response = await axios.put(
        "https://v2.api.noroff.dev/social/profiles/my_profile_name",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error updating profile:", error); // Log error to console
      setError("Error updating profile");
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <h3>Name: {profile.name}</h3>
        <img src={profile.avatar.url} alt={profile.avatar.alt} />
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        <img src={profile.banner.url} alt={profile.banner.alt} />
        <input type="file" accept="image/*" onChange={handleBannerChange} />
        <button onClick={updateProfile}>Update Profile</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Profile updated successfully!</p>
      )}
    </div>
  );
};

export default ProfilePage;
