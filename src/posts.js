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

import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiKey = localStorage.getItem("apiKey"); // Get API key from localStorage
        const response = await axios.get(
          "https://v2.api.noroff.dev/social/posts",
          {
            headers: {
              "X-Noroff-API-Key": apiKey, // Include API key in request headers
            },
          }
        );
        console.log("Posts data:", response.data); // Log fetched data
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error); // Log the specific error message
        setError("Error fetching posts: " + error.message); // Set the error state with the message
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
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {/* You can add more post details here */}
        </div>
      ))}
    </div>
  );
};

export default Posts;
