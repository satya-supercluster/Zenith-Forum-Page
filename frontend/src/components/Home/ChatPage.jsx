import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Global/avatar";
import { Input } from "../Global/input";
import { Button } from "../Global/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const {auth,setSelectedUser}=useAuth();
  const user = auth?.user;
  const suggestedUsers = auth?.suggestedUsers;
  const selectedUser = auth?.selectedUser;
  const { onlineUsers, messages, setMessages } = useData();

  const sendMessageHandler = async (receiverId) => {
    try {
      const response = await fetch(
        `https://zenith-forum-page.onrender.com/api/message/send/${receiverId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ textMessage }),
        }
      );

      const res = await response.json();

      if (res.success) {
        setMessages((prevMessages) => [
          ...(prevMessages || []),
          res.newMessage,
        ]); 
        setTextMessage("");
      } else {
        console.error("Message sending failed:", res.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

  };

  useEffect(() => {
    return () => {
      setSelectedUser(null);
    };
  }, []);

  return (
    <div className="flex ml-[16%] h-[calc(100vh-4rem)]">
      <section className="w-full md:w-1/4 my-8">
        <h1 className="font-bold mb-4 px-3 text-xl">Chats</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers?.map((suggestedUser,index) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                key={index}
                onClick={() => setSelectedUser(suggestedUser)}
                className="flex gap-3 items-center p-3 hover:bg-gray-800 cursor-pointer"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser?.username}</span>
                  <span
                    className={`text-xs font-bold ${
                      isOnline ? "text-green-600" : "text-red-600"
                    } `}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 z-10">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <Messages selectedUser={selectedUser} />
          <div className="flex items-center p-4 border-t border-t-gray-300">
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex-1 mr-2 focus-visible:ring-transparent"
              placeholder="Messages..."
            />
            <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium">Your messages</h1>
          <span>Send a message to start a chat.</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
