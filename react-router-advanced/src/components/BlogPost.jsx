// src/components/BlogPost.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams(); // Get the dynamic id from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the blog post data using the dynamic id
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]); // Refetch the data if the id changes

  if (!post) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default BlogPost;
