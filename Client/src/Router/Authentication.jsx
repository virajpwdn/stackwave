import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const cookie = document.cookie.split("; ").find(row => row.startsWith("="));
      if (!cookie) {
        return navigate("/login");
      }
      const token = cookie.split("=")[1];
      console.log(token);
      if (!token) {
        return navigate("/login");
      }
    } catch (error) {
      return navigate("/signup");
    }
  }, []);
  return {children};
};

export default Authentication;
