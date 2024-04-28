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
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ProfilePage = () => {
//   const { profileName } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [newAvatar, setNewAvatar] = useState(null);
//   const [newBanner, setNewBanner] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const apiKey = localStorage.getItem("apiKey"); // Get API key from local storage
//         if (!token || !apiKey) {
//           throw new Error("Access token or API key not found");
//         }

//         const response = await axios.get(
//           `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "X-Noroff-API-Key": apiKey, // Add API key to request headers
//             },
//           }
//         );
//         setProfile(response.data.data);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//         setError("Error fetching profile data");
//       }
//     };

//     fetchProfileData();
//   }, [profileName]);

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
//       const apiKey = localStorage.getItem("apiKey"); // Get API key from local storage
//       if (!token || !apiKey) {
//         throw new Error("Access token or API key not found");
//       }

//       const response = await axios.put(
//         `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//             "X-Noroff-API-Key": apiKey, // Add API key to request headers
//           },
//         }
//       );
//       setProfile(response.data.data);
//       setSuccess(true);
//     } catch (error) {
//       console.error("Error updating profile:", error);
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
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && (
//         <p style={{ color: "green" }}>Profile updated successfully!</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
// //ProfilePage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ProfilePage = () => {
//   const { profileName } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [newAvatar, setNewAvatar] = useState(null);
//   const [newBanner, setNewBanner] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const apiKey = localStorage.getItem("apiKey"); // Get API key from local storage
//         if (!token || !apiKey || !profileName) {
//           throw new Error("Access token, API key, or profile name not found");
//         }

//         const response = await axios.get(
//           `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "X-Noroff-API-Key": apiKey, // Add API key to request headers
//             },
//           }
//         );
//         setProfile(response.data.data);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//         setError("Error fetching profile data");
//       }
//     };

//     fetchProfileData();
//   }, [profileName]);

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
//       const apiKey = localStorage.getItem("apiKey"); // Get API key from local storage
//       if (!token || !apiKey || !profileName) {
//         throw new Error("Access token, API key, or profile name not found");
//       }

//       const response = await axios.put(
//         `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//             "X-Noroff-API-Key": apiKey, // Add API key to request headers
//           },
//         }
//       );
//       setProfile(response.data.data);
//       setSuccess(true);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setError("Error updating profile");
//     }
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   if (!profileName) {
//     return <div>Error: Profile name not provided in URL</div>;
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
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && (
//         <p style={{ color: "green" }}>Profile updated successfully!</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

// // ProfilePage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ProfilePage = () => {
//   const { profileName } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [newAvatar, setNewAvatar] = useState(null);
//   const [newBanner, setNewBanner] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const apiKey = localStorage.getItem("apiKey");
//         if (!token || !apiKey || !profileName) {
//           throw new Error("Access token, API key, or profile name not found");
//         }

//         const response = await axios.get(
//           `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "X-Noroff-API-Key": apiKey,
//             },
//           }
//         );
//         setProfile(response.data.data);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//         setError("Error fetching profile data");
//       }
//     };

//     fetchProfileData();
//   }, [profileName]);

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
//       const apiKey = localStorage.getItem("apiKey");
//       if (!token || !apiKey || !profileName) {
//         throw new Error("Access token, API key, or profile name not found");
//       }

//       const response = await axios.put(
//         `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//             "X-Noroff-API-Key": apiKey,
//           },
//         }
//       );
//       setProfile(response.data.data);
//       setSuccess(true);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setError("Error updating profile");
//     }
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   if (!profileName) {
//     return <div>Error: Profile name not provided in URL</div>;
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
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && (
//         <p style={{ color: "green" }}>Profile updated successfully!</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

// // ProfilePage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ProfilePage = () => {
//   const { profileName } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [newAvatar, setNewAvatar] = useState(null);
//   const [newBanner, setNewBanner] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         if (!profileName) {
//           const storedProfileName = localStorage.getItem("profileName");
//           if (!storedProfileName) {
//             throw new Error("Profile name not provided");
//           }
//           setProfileName(storedProfileName);
//         }
//         const token = localStorage.getItem("accessToken");
//         const apiKey = localStorage.getItem("apiKey");
//         if (!token || !apiKey) {
//           throw new Error("Access token or API key not found");
//         }

//         const response = await axios.get(
//           `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "X-Noroff-API-Key": apiKey,
//             },
//           }
//         );
//         setProfile(response.data.data);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//         setError("Error fetching profile data");
//       }
//     };

//     fetchProfileData();
//   }, [profileName]);

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
//       if (!profileName) {
//         throw new Error("Profile name not provided");
//       }
//       const token = localStorage.getItem("accessToken");
//       const apiKey = localStorage.getItem("apiKey");
//       if (!token || !apiKey) {
//         throw new Error("Access token or API key not found");
//       }

//       const response = await axios.put(
//         `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//             "X-Noroff-API-Key": apiKey,
//           },
//         }
//       );
//       setProfile(response.data.data);
//       setSuccess(true);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setError("Error updating profile");
//     }
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   if (!profileName) {
//     return <div>Error: Profile name not provided in URL</div>;
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
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && (
//         <p style={{ color: "green" }}>Profile updated successfully!</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

// // ProfilePage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ProfilePage = () => {
//   const { profileName } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [newAvatar, setNewAvatar] = useState(null);
//   const [newBanner, setNewBanner] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         if (!profileName) {
//           const storedProfileName = localStorage.getItem("profileName");
//           if (!storedProfileName) {
//             throw new Error("Profile name not provided");
//           }
//           setProfile(storedProfileName); // Corrected from setProfileName
//         }
//         const token = localStorage.getItem("accessToken");
//         const apiKey = localStorage.getItem("apiKey");
//         if (!token || !apiKey) {
//           throw new Error("Access token or API key not found");
//         }

//         const response = await axios.get(
//           `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "X-Noroff-API-Key": apiKey,
//             },
//           }
//         );
//         setProfile(response.data.data);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//         setError("Error fetching profile data");
//       }
//     };

//     fetchProfileData();
//   }, [profileName]);

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
//       if (!profileName) {
//         throw new Error("Profile name not provided");
//       }
//       const token = localStorage.getItem("accessToken");
//       const apiKey = localStorage.getItem("apiKey");
//       if (!token || !apiKey) {
//         throw new Error("Access token or API key not found");
//       }

//       const response = await axios.put(
//         `https://v2.api.noroff.dev/social/profiles/${profileName}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//             "X-Noroff-API-Key": apiKey,
//           },
//         }
//       );
//       setProfile(response.data.data);
//       setSuccess(true);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setError("Error updating profile");
//     }
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   if (!profileName) {
//     return <div>Error: Profile name not provided in URL</div>;
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
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && (
//         <p style={{ color: "green" }}>Profile updated successfully!</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { profileName } = useParams();
  const [profile, setProfile] = useState(null);
  const [newAvatar, setNewAvatar] = useState("");
  const [newBanner, setNewBanner] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("Profile Name:", profileName); // Log profileName

    const fetchProfileData = async () => {
      try {
        if (!profileName) {
          throw new Error("Profile name not provided");
        }

        const token = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        if (!token || !apiKey) {
          throw new Error("Access token or API key not found");
        }

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
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data");
      }
    };

    fetchProfileData();
  }, [profileName]);

  const handleAvatarChange = (e) => {
    setNewAvatar(e.target.value);
  };

  const handleBannerChange = (e) => {
    setNewBanner(e.target.value);
  };

  const updateProfile = async () => {
    const profileData = {};
    if (newAvatar || newBanner) {
      profileData.bio = profile.bio; // Retain existing bio if not updated
      if (newAvatar) {
        profileData.avatar = {
          url: newAvatar,
          alt: "New Avatar",
        };
      }
      if (newBanner) {
        profileData.banner = {
          url: newBanner,
          alt: "New Banner",
        };
      }
      try {
        const token = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        if (!token || !apiKey) {
          throw new Error("Access token or API key not found");
        }

        const response = await axios.put(
          `https://v2.api.noroff.dev/social/profiles/${profileName}`,
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );
        setProfile(response.data.data);
        setSuccess(true);
      } catch (error) {
        console.error("Error updating profile:", error);
        setError("Error updating profile");
      }
    } else {
      setError("Please enter a new avatar URL or banner URL to update.");
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  if (!profileName) {
    return <div>Error: Profile name not provided in URL</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <h3>Name: {profile.name}</h3>
        <img src={profile.avatar.url} alt={profile.avatar.alt} />
        <input
          type="text"
          value={newAvatar}
          onChange={handleAvatarChange}
          placeholder="Enter avatar URL"
        />
        <img src={profile.banner.url} alt={profile.banner.alt} />
        <input
          type="text"
          value={newBanner}
          onChange={handleBannerChange}
          placeholder="Enter banner URL"
        />
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
