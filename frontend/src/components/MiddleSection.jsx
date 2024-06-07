import React, { useState } from "react";

const MiddleSection = () => {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handlePostMessage = () => {
    // Here, you would handle the logic for posting the message and topic
    // For example, you could make an API call or update state in a parent component
    console.log("Posting message:", message);
    console.log("Posting topic:", topic);
    setMessage("");
    setTopic("");
  };

  return (
    <div className="w-full mx-5">
      <div className="bg-white rounded-lg shadow-md shadow-slate-500 p-4">
        <input
          type="text"
          className="w-full mb-2 px-4 py-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Topic"
          value={topic}
          onChange={handleTopicChange}
        />
        <textarea
          className="w-full h-20 px-4 py-2 rounded-md focus:outline-none overflow-hidden resize-none"
          placeholder="What's on your mind?"
          value={message}
          onChange={handleMessageChange}
        />
        <div className="flex justify-end mt-4">
          <button
            className={`px-4 py-2 rounded-md text-white shadow-md font-semibold ${
              (topic.trim() && message.trim())
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

export default MiddleSection;
