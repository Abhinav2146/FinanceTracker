import { useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_DATA);
        if (isMounted && response.data) {
          updateUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };
    fetchUserData();
    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
};
