import React from "react";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "@/data/useGetAllPost";
import useGetSuggestedUsers from "@/data/useGetSuggestedUsers";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
