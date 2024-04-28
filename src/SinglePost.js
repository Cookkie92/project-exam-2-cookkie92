// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SinglePost = ({ postId }) => {
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         const apiKey = localStorage.getItem("apiKey");
//         const response = await axios.get(
//           `https://v2.api.noroff.dev/social/posts/${postId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "X-Noroff-API-Key": apiKey,
//             },
//           }
//         );
//         setPost(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching post");
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>{post.title}</h2>
//       <p>{post.body}</p>
//       {/* Display other post details */}
//     </div>
//   );
// };

// export default SinglePost;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SinglePost = ({ postId }) => {
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       if (!postId) {
//         setError("Post ID is missing");
//         setLoading(false);
//         return;
//       }

//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         const apiKey = localStorage.getItem("apiKey");
//         const response = await axios.get(
//           `https://v2.api.noroff.dev/social/posts/${postId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "X-Noroff-API-Key": apiKey,
//             },
//           }
//         );
//         console.log("Post data:", response.data); // Log the response data
//         setPost(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching post:", error); // Log any errors
//         setError("Error fetching post");
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>{post.title}</h2>
//       <p>{post.body}</p>
//       {/* Display other post details */}
//     </div>
//   );
// };

// export default SinglePost;

// // SinglePost.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom"; // Import useParams hook

// const SinglePost = () => {
//   const { postId } = useParams(); // Extract postId from URL
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         const apiKey = localStorage.getItem("apiKey");
//         const response = await axios.get(
//           `https://v2.api.noroff.dev/social/posts/${postId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "X-Noroff-API-Key": apiKey,
//             },
//           }
//         );
//         console.log("Post data:", response.data); // Log the response data
//         setPost(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching post:", error); // Log any errors
//         setError("Error fetching post");
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postId]); // Include postId in the dependency array

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>{post.title}</h2>
//       <p>{post.body}</p>
//       {/* Display other post details */}
//     </div>
//   );
// };

// export default SinglePost;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate(); // Define useNavigate

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
        setPost(response.data.data);
        setLoading(false);
        const userId = localStorage.getItem("userId");
        if (userId === response.data.data.userId) {
          setIsOwner(true);
        }
      } catch (error) {
        setError("Error fetching post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

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

  if (error || !post) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {isOwner && (
        <div>
          <Link to={`/posts/${postId}/edit`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
