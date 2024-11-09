// src/components/UserProfile.jsx
import React, { useContext } from 'react';
import UserContext from '../UserContext'; // Import the UserContext

function UserProfile() {
  // Use useContext to consume the context and get userData
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;
