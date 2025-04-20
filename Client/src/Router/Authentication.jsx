import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../config/baseurl";
import { useSelector } from "react-redux";

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector(state => state.user.user);
  
  useEffect(() => {
    const verify = async () => {
      try {
        // If user is already in Redux state, consider them authenticated
        if (user) {
          setIsAuthenticated(true);
          return;
        }
        
        // Check for token in cookies
        const cookie = document.cookie?.split("; ");
        const tokenCookie = cookie?.find((row) => row.startsWith("token="));
        
        if (!tokenCookie) {
          console.log("No token cookie found");
          return navigate("/login");
        }
        
        const token = tokenCookie.split("=")[1];
        if (!token) {
          console.log("Token is empty");
          return navigate("/login");
        }
        
        console.log("Token found, verifying with backend");
        
        // Verify token with backend
        const verifyUser = await axios.get(BASE_URL + "/auth/verification", {
          withCredentials: true,
        });
        
        // If verification successful but no user data, redirect to login
        if (!verifyUser.data || !verifyUser.data.success) {
          console.log("Verification failed", verifyUser.data);
          return navigate("/login");
        }
        
        // User is authenticated, continue
        console.log("User verified successfully");
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication error:", error);
        // For any error during verification, redirect to login
        navigate("/login");
      }
    };
  
    verify();
  }, [navigate, user]); // Add user to dependency array
  
  // Show loading or nothing while checking authentication
  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }
  
  return <>{children}</>;
};

export default Authentication;
