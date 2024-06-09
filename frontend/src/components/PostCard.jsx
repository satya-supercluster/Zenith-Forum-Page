// src/components/MessageCard.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ sender, message, topic }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  return (
    <div className="w-full h-fit bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-[0.7rem] mb-1">
          <div>Posted by: {sender}</div>
        </div>
        <div className="p-2 bg-slate-300 rounded-lg">
          <div className="font-bold text-[1rem] mb-2">
            <div>Topic: {topic}</div>
          </div>
          <p className="text-gray-700 text-base break-words overflow-hidden">
            {message}
          </p>
        </div>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="text-gray-600 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faThumbsDown}
            className="text-gray-600 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faComment}
            className="text-gray-600 cursor-pointer"
            onClick={toggleComments}
          />
        </div>
      </div>
      {isCommentsOpen && (
        <div className="px-6 py-4 bg-gray-100">
          <div className="text-gray-700 text-sm">
            {/* Comments would be dynamically loaded here */}
            This is where the comment thread will be displayed.
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
