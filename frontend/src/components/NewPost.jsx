import React, { useState } from "react";
const NewPost = () => {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");
//   const createPost = async (userId, message, topic, token) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/post/post", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           userId,
//           message,
//           topic,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Post created successfully:", data);
//       return data;
//     } catch (error) {
//       console.error("Failed to create post:", error);
//       throw error;
//     }
//   };
  const handlePostMessage = () => {
    // Here, you would handle the logic for posting the message and topic

    console.log("Posting message:", message);
    console.log("Posting topic:", topic);
    setMessage("");
    setTopic("");
  };
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md shadow-slate-500 p-4">
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
          className="w-full h-20 px-4 py-2 rounded-md focus:outline-none overflow-hidden resize-none"
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div className="flex justify-end mt-4">
          <button
            className={`px-4 py-2 rounded-md text-white shadow-md font-semibold ${
              topic.trim() && message.trim()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handlePostMessage}
            disabled={!topic.trim() || !message.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
