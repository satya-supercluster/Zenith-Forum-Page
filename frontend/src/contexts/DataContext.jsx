import React, { createContext, useContext, useState } from "react";
const DataContext = createContext();
export const useData = () => useContext(DataContext);
export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts,setPosts]=useState(null);
  const [selectedPosts,setSelectedPosts]=useState(null);
  const [messages,setMessages]=useState(null);
  const [socket,setSocket]=useState(null);
  const [likeNotification,setLikeNotification]=useState([]);
  const [onlineUsers,setOnlineUsers]=useState(null);
  const [refresh,setRefresh]=useState(false);


  const setRealTimeNotification =(payload)=>{
    if (payload.type === "like") {
      setLikeNotification(...likeNotification,payload)
    } else if (payload.type === "dislike") {
      const newLikeNotification=likeNotification.filter(
        (item) => item.userId !== payload.userId
      );
      setLikeNotification(newLikeNotification);
    }
  }

  return (
    <DataContext.Provider
      value={{
        isLoading,
        setIsLoading,
        posts,
        setPosts,
        messages,
        setMessages,
        socket,
        setSocket,
        likeNotification,
        setLikeNotification,
        onlineUsers,
        setOnlineUsers,
        refresh,
        setRefresh,
        setRealTimeNotification,
        selectedPosts,
        setSelectedPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
