import React from "react";
import Post from "./Post";
import { useData } from "../../contexts/DataContext";
const Posts = () => {
  const { posts } = useData();
  return (
    <div className="px-1">
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
