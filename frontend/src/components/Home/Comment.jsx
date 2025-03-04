import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Global/avatar";

const Comment = ({ comment }) => {
  return (
    <div className="my-2">
      <div className="flex gap-3 items-center bg-gray-500 text-gray-50">
        <Avatar>
          <AvatarImage src={comment?.author?.profilePicture} />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-sm">
          {comment?.author?.username}{" "}
          <span className="font-normal pl-1">{comment?.text}</span>
        </h1>
      </div>
    </div>
  );
};

export default Comment;
