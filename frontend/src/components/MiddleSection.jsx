import React, { useEffect, useState } from "react";
import NewPost from "./NewPost";
import PostCard from "./PostCard";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
export const getPost = async (recievedToken, logout, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${import.meta.env.VITE_SITE}/api/get/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${recievedToken}`,
      },
    });
    if (!response.ok) {
      setIsLoading(false);
      if (response.status === 401) logout();
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log("Posts successfully got:", data);
    setIsLoading(false);
    return data.data;
  } catch (error) {
    console.error("Failed to get posts:", error);
    throw error;
  }
};
const MiddleSection = () => {
  const { newPostSection,refetch,select } = useData();
  const { logout, token,user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  useEffect(() => {
    console.log(user);
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPost(token, logout,setIsLoading);
        setPosts(fetchedPosts);
        const currentUserPosts = fetchedPosts.filter(
          (post) => post.user._id === user.id
        );
        setUserPosts(currentUserPosts);
      } catch (error) {
        // Error is already logged in getPost
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [token, logout,refetch,user.id]);
  return (
    <div className="w-full mx-5 flex flex-col items-center">
      {newPostSection ? <NewPost /> : <div></div>}
      <div>
        <h1 className="text-center font-bold text-blue-700 text-3xl pb-1">
          Feed
        </h1>
      </div>
      {isLoading ? (
        <div className="text-2xl text-gray-700 p-5 w-full h-full font-bold flex justify-center items-center">
          Loading Posts...
        </div>
      ) : select === 2 ? (
        <div className="w-full flex flex-col gap-5 justify-center">
          {userPosts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-5 justify-center">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
      <div className="h-16"></div>
    </div>
  );
};

export default MiddleSection;
