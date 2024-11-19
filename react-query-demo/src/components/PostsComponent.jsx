// src/components/PostsComponent.jsx
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

function PostsComponent() {
  // Function to fetch posts from the API
  const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  };

  // Use React Query to fetch posts with caching and other advanced features
  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery(
    'posts', // Query key
    fetchPosts, // Data-fetching function
    {
      cacheTime: 5 * 60 * 1000, // Cache data for 5 minutes (300000 ms)
      staleTime: 30 * 1000, // Data is fresh for 30 seconds (30000 ms)
      refetchOnWindowFocus: true, // Refetch data when the window gains focus
      keepPreviousData: true, // Keep previous data while fetching new data
    }
  );

  // Loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <button onClick={refetch} disabled={isFetching}>
        {isFetching ? 'Refetching...' : 'Refetch Posts'}
      </button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {isFetching && <div>Fetching new posts...</div>}
    </div>
  );
}

export default PostsComponent;
