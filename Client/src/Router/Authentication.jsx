import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../config/baseurl";

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
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
  
        try {
          const verifyUser = await axios.get(BASE_URL + "/auth/verification", {
            withCredentials: true,
          });
          console.log(verifyUser.data);
        } catch (error) {
          console.error(error);
          navigate("/login");
        }
      } catch (error) {
        navigate("/signup");
      }
    };
  
    verify();
  }, []);
  
  return <>{children}</>;
};

export default Authentication;