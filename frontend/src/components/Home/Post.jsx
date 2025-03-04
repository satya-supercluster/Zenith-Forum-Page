import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Global/avatar";
import { Dialog, DialogContent, DialogTrigger } from "../Global/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "../Global/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { toast } from "sonner";
import { Badge } from "../Global/badge";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const user=auth?.user;
  const { posts, setPosts, setSelectedPosts } = useData();
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await fetch(
        `https://zenith-forum-page.onrender.com/api/post/${post._id}/${action}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        setPosts(updatedPostData);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const commentHandler = async () => {
    try {
      const res = await fetch(
        `https://zenith-forum-page.onrender.com/api/post/${post._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.success) {
        const updatedCommentData = [...comment, data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );
        setPosts(updatedPostData);
        toast.success(data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }

  };

  const deletePostHandler = async () => {
    try {
      const res = await fetch(
        `https://zenith-forum-page.onrender.com/api/post/delete/${post?._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        setPosts(updatedPostData);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      try {
        const errData = await error.response.json();
        toast.error(errData.message);
      } catch {
        toast.error("Something went wrong");
      }
    }

  };

  const bookmarkHandler = async () => {
    try {
      const res = await fetch(
        `https://zenith-forum-page.onrender.com/api/post/${post?._id}/bookmark`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <div className="my-8 w-full max-w-sm mx-auto shadow-[0_5px_15px_rgba(0,0,0,0)] p-2 shadow-gray-800 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <h1>{post.author?.username}</h1>
            {user?._id === post.author._id && (
              <Badge variant="secondary">Author</Badge>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {post?.author?._id !== user?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
            )}

            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>
            {user && user?._id === post?.author._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer w-fit"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg m-2 overflow-hidden">
        <img
          className="w-full aspect-square object-cover"
          src={post.image}
          alt="post_img"
        />
      </div>

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={"24"}
              className="cursor-pointer text-red-600"
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
            />
          )}

          <MessageCircle
            onClick={() => {
              setSelectedPosts(post);
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark
          onClick={bookmarkHandler}
          className="cursor-pointer hover:text-gray-600"
        />
      </div>
      <span className="font-medium block mb-2">{postLike} likes</span>
      <p>
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post.caption}
      </p>
      {comment.length > 0 && (
        <span
          onClick={() => {
            setSelectedPosts(post);
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          View all {comment.length} comments
        </span>
      )}
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full bg-transparent text-gray-50 py-1"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
