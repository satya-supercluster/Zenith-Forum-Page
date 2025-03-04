import { useEffect } from "react";
import { useData } from "../contexts/DataContext";
const useGetRTM = () => {
    const {socket,messages,setMessages}=useData();
    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            setMessages([...messages, newMessage]);
        })
        return () => {
            socket?.off('newMessage');
        }
    }, [messages, setMessages]);
};
export default useGetRTM;