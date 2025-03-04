import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useGetUserProfile = (userId) => {
    const {setUserProfile}=useAuth();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
              const response = await fetch(
                `http://localhost:3000/api/user/${userId}/profile`,
                {
                  method: "GET",
                  credentials: "include", // Ensures cookies are sent
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const data = await response.json();

              if (data.success) {
                setUserProfile(data.user);
              }
            } catch (error) {
              console.log("Error fetching user profile:", error);
            }
        }
        fetchUserProfile();
    }, [userId]);
};
export default useGetUserProfile;