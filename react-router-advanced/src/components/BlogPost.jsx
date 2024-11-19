import React from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams();
  return (
    <div>
      <h1>Post ID: {id}</h1>
      <p>This is the content of the post with ID {id}.</p>
    </div>
  );
}

export default BlogPost;
