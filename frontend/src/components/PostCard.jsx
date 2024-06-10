// src/components/MessageCard.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import AnswerCard from "./AnswerCard";

const PostCard = ({ post }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { token,user } = useAuth();
  const { refetch, setRefetch } = useData();
  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };
  const createAnswer = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SITE}/api/post/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            answer: answer,
            postId: post._id,
          }),
        }
      );
      console.log(await response.json())
      if (!response.ok) {
        setLoading(false);
        if (response.status === 401) logout();
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRefetch(!refetch);
      setLoading(false);
      // const data = await response.json();
      // console.log("Post created successfully:", data);
      // return data;
    } catch (error) {
      setLoading(false);
      console.error("Failed to create answer:", error);
      throw error;
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    await createAnswer();
    setAnswer("");
  };
  return (
    <div className="w-full h-fit bg-gray-100 shadow-md shadow-blue-300 rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-[0.7rem] mb-1 break-words overflow-hidden">
          <div>Posted by: {post.user.name}</div>
        </div>
        <div className="p-2 bg-slate-300 rounded-lg">
          <div className="font-bold text-[1rem] mb-2 break-words overflow-hidden">
            Topic: {post.topic}
          </div>
          <p className="text-gray-700 text-base break-words overflow-hidden">
            {post.message}
          </p>
        </div>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex space-x-4 justify-between w-full">
          <div className="flex gap-5">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="text-gray-600 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faThumbsDown}
              className="text-gray-600 cursor-pointer"
            />
          </div>
          <div
            className="flex gap-2 justify-center items-center cursor-pointer"
            onClick={toggleComments}
          >
            <div className="text-md font-semibold text-gray-600">Answer</div>
            <FontAwesomeIcon
              icon={faComment}
              className="text-gray-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
      {isCommentsOpen && (
        <div className="px-6 bg-gray-100">
          <div className=" py-4">
            <div className="text-gray-700 text-sm flex flex-col gap-3 justify-center items-center">
              <textarea
                className="w-full h-12 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none border-2 border-slate-300"
                placeholder="Answer it..."
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
              <button
                className=" bg-blue-500 w-[40%] h-10 p-1 text-xl flex justify-center items-center  text-white rounded-full"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                {loading ? <div>...</div> : <div></div>}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-3">
            {post.answers?.map((ans) => {
              return <AnswerCard key={ans._id} answer={ans}></AnswerCard>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
