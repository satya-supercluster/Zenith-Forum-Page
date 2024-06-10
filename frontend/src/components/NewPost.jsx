import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
const NewPost = () => {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const { token, user, logout } = useAuth();
  const { refetch, setRefetch,newPostSection,setNewPostSection } = useData();
  const createPost = async (userId, message, topic, recievedToken) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SITE}/api/post/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${recievedToken}`,
        },
        body: JSON.stringify({
          userId,
          message,
          topic,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) logout();
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRefetch(!refetch);
      // const data = await response.json();
      // console.log("Post created successfully:", data);
      // return data;
    } catch (error) {
      console.error("Failed to create post:", error);
      throw error;
    }
  };
  const handlePostMessage = async () => {
    // Here, you would handle the logic for posting the message and topic
    setNewPostSection(!newPostSection);
    await createPost(user.id, message, topic, token);
    setMessage("");
    setTopic("");
  };
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md shadow-blue-300 p-4 my-5">
        <div className="pb-2 text-lg text-blue-500 font-semibold">
          Create Post
        </div>
        <input
          type="text"
          className="w-full mb-2 px-4 py-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Topic"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        />
        <textarea
          className="w-full h-20 px-4 py-2 rounded-md focus:outline-none border border-gray-300 overflow-hidden resize-none"
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        />
        <div className="flex justify-between items-center mt-4">
          <div className="text-yellow-700 text-[0.7rem]">*Both Fields are Required</div>
          <button
            className={`px-4 py-2 rounded-md text-white shadow-md font-semibold ${
              topic.trim() && message.trim()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handlePostMessage}
            disabled={!topic.trim() || !message.trim() || !newPostSection}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
