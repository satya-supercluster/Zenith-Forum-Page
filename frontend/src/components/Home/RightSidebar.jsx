import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Global/avatar";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";
import { useAuth } from "../../contexts/AuthContext";

const RightSidebar = () => {
  const { auth } = useAuth();
  const user=auth?.user;
  return (
    <div className="w-fit my-10 pr-32 max-lg:hidden">
      <div className="flex items-center gap-2">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="font-semibold text-sm">
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className="text-gray-300 text-sm">
            {user?.bio || "Bio here..."}
          </span>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  );
};

export default RightSidebar;
