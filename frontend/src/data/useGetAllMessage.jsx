import { useEffect } from "react";
import { useData } from "../contexts/DataContext";

const useGetAllMessage = () => {
    const {selectedUser,setMessages,messages} = useData();
    useEffect(() => {
        const fetchAllMessage = async () => {
            try {
              const res = await fetch(
                `https://zenith-forum-page.onrender.com/api/message/all/${selectedUser?._id}`,
                {
                  method: "GET",
                  credentials: "include",
                }
              );

              const data = await res.json();

              if (data.success) {
                setMessages(data.messages);
              }
            } catch (error) {
              console.log(error);
            }

        }
        if (selectedUser) {fetchAllMessage(); console.log(messages);}
    }, [selectedUser]);
};
export default useGetAllMessage;