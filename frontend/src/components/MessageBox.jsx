// src/components/MessageCard.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const MessageCard = ({ sender, message }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{sender}</div>
        <p className="text-gray-700 text-base">{message}</p>
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

export default MessageCard;
