// src/components/MessageCard.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ sender, message, topic }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
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
          <div className="text-gray-700 text-sm flex flex-col gap-3 justify-center items-center">
            <textarea
              className="w-full h-12 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none"
              placeholder="Answer it..."
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
            <button className=" bg-blue-500 w-[40%] p-1 text-xl max-md:text-md text-white rounded-full">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
