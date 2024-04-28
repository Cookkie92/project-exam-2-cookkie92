// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const token = localStorage.getItem("accessToken"); // Assuming you store the access token in localStorage
//         const apiKey = "YOUR_API_KEY"; // Replace "YOUR_API_KEY" with your actual API key

//         if (!token || !apiKey) {
//           throw new Error("Access token or API key not found");
//         }

//         const response = await axios.get(
//           "https://v2.api.noroff.dev/social/posts",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "X-Noroff-API-Key": apiKey,
//             },
//           }
//         );
//         setPosts(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching posts");
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Posts</h2>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.body}</p>
//           {/* You can add more post details here */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Posts;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken"); // Get access token from localStorage
//         const apiKey = localStorage.getItem("apiKey"); // Get API key from localStorage
//         const response = await axios.get(
//           "https://v2.api.noroff.dev/social/posts",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`, // Include access token in Authorization header
//               "X-Noroff-API-Key": apiKey, // Include API key in request headers
//             },
//           }
//         );
//         console.log("Posts data:", response.data); // Log fetched data
//         setPosts(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts:", error); // Log the specific error message
//         setError("Error fetching posts: " + error.message); // Set the error state with the message
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Posts</h2>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.body}</p>
//           {/* You can add more post details here */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Posts;

// Posts.js
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
        console.log("Posts data:", response.data); // Log the response data
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error); // Log any errors
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
