import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../Global/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../Global/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../Global/button";
import Comment from "./Comment";
import { toast } from "sonner";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPosts, posts, setPosts } = useData();
  const [comment, setComment] = useState([]);
  const {auth}=useAuth();
  const user=auth?.user;

  useEffect(() => {
    if (selectedPosts) {
      setComment(selectedPosts.comments);
    }
  }, [selectedPosts]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/post/delete/${post?._id}`,
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

  const sendMessageHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/post/${selectedPosts?._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ text }),
        }
      );

      const res = await response.json();

      if (res.success) {
        const updatedCommentData = [...comment, res.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPosts._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        setPosts(updatedPostData);
        toast.success(res.message);
        setText("");
      } else {
        console.error("Comment post failed:", res.message);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Dialog open={open} className="md:h-[50vh] h-[65vh]">
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-5xl p-0 flex flex-col"
      >
        <div className="flex flex-1">
          <div className="max-md:hidden md:w-1/2">
            <img
              src={selectedPosts?.image}
              alt="post_img"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-1/2 max-md:w-full flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPosts?.author?.profilePicture} />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">
                    {selectedPosts?.author?.username}
                  </Link>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  {selectedPosts?.author?._id !== user?._id && (
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
                  {user && user?._id === selectedPosts?.author._id && (
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
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              {comment.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder="Add a comment..."
                  className="w-full outline-none border text-sm border-gray-300 p-2 rounded"
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  variant="outline"
                  className="text-gray-50"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
