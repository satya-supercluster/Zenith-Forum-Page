import React from "react";
import NewPost from "./NewPost";
import PostCard from "./PostCard";
import { useData } from "../contexts/DataContext";
const MiddleSection = () => {
  const { newPostSection } = useData();
  return (
    <div className="w-full mx-5 flex flex-col items-center">
      {newPostSection ? <NewPost /> : <div></div>}
      <div>
        <h1 className="text-center font-bold text-blue-700 text-3xl py-1">Feed</h1>
      </div>
      <div className="w-full flex justify-center">
        <PostCard sender="Satyam Gupta" message="Heelo, How are you logo!" />
      </div>
    </div>
  );
};

export default MiddleSection;
