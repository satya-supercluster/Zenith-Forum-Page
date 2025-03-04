import React from "react";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import { useToggle } from "../../contexts/ToggelContext";
const Feed = () => {
  const {isCreatePostOpen,setIsCreatePostOpen}=useToggle();
  return (
    <div className="flex-1 my-8 flex flex-col items-center md:pl-[20%]">
      <CreatePost open={isCreatePostOpen} setOpen={setIsCreatePostOpen} />
      <Posts />
    </div>
  );
};

export default Feed;
