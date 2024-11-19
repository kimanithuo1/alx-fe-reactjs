import React from "react";
import { Navigate } from "react-router-dom";

// Simulate authentication
const isAuthenticated = true; // Change this to false to test redirection for unauthenticated access

function ProtectedRoute({ children }) {
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
