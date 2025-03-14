import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const useGetSuggestedUsers = () => {
  const {setSuggestedUsers}=useAuth();
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await fetch(
          "https://zenith-forum-page.onrender.com/api/user/suggested",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          setSuggestedUsers(data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedUsers();
  }, []);
};
export default useGetSuggestedUsers;
