import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const useGetAllMessage = () => {
    const {selectedUser} = useAuth;
    useEffect(() => {
        const fetchAllMessage = async () => {
            try {
                const res = await axios.get(`https:localhost:3000/api/message/all/${selectedUser?._id}`, { withCredentials: true });
                if (res.data.success) {  
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllMessage();
    }, [selectedUser]);
};
export default useGetAllMessage;