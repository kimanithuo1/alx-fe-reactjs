// src/hooks/useAuth.js
import { useState, useEffect } from "react";

// Simulating a login status
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate checking authentication status
  useEffect(() => {
    // Example: You can use localStorage, cookies, or make API calls here.
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true"; 
    setIsAuthenticated(userLoggedIn);
  }, []);

  return { isAuthenticated };
};
