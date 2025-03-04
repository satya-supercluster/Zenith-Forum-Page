import axios from "axios";
import { useEffect } from "react";
import { useData } from "../contexts/DataContext";

const useGetAllMessage = () => {
    const {selectedUser,setMessages} = useData();
    useEffect(() => {
        const fetchAllMessage = async () => {
            try {
              const res = await fetch(
                `http://localhost:3000/api/message/all/${selectedUser?._id}`,
                {
                  method: "GET",
                  credentials: "include", // Equivalent to withCredentials: true in Axios
                }
              );

              const data = await res.json(); // Parse the response

              if (data.success) {
                setMessages(data.messages);
              }
            } catch (error) {
              console.log(error);
            }

        }
        fetchAllMessage();
    }, [selectedUser]);
};
export default useGetAllMessage;