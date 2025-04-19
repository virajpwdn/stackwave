import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const cookie = document.cookie?.split("; ");
      const tokenCookie = cookie?.find((row) => row.startsWith("token="));
      if (!tokenCookie) {
        return navigate("/login");
      }
      const token = tokenCookie.split("=")[1];
      console.log(token);
      if (!token) {
        return navigate("/login");
      }
    } catch (error) {
      return navigate("/signup");
    }
  }, []);
  return <>{children}</>;
};

export default Authentication;