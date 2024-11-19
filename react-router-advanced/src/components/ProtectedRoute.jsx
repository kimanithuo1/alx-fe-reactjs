// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Import the useAuth hook

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Check if user is authenticated

  if (!isAuthenticated) {
    // If not authenticated, redirect to the home page or login page
    return <Navigate to="/" replace />;
  }

  return children; // Render children (protected component)
};

export default ProtectedRoute;
