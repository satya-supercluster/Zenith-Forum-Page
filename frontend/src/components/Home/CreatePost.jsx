import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '../Global/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../Global/avatar';
import { Textarea } from '../Global/textarea';
import { Button } from '../Global/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const {auth} = useAuth();
  const user=auth?.user;
  const {posts,setPosts} = useData();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);
    try {
      setLoading(true);

      const res = await fetch(
        "https://zenith-forum-page.onrender.com/api/post/addpost",
        {
          method: "POST",
          headers: {},
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setPosts([data.post, ...posts]);
        toast.success(data.message);
        setCaption("");
        setFile("");
        setImagePreview("");
        setOpen(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }

  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center font-semibold text-gray-50">
          Create New Post
        </DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs text-gray-50">
              {user?.username}
            </h1>
            <span className="text-xs text-gray-50">Bio here...</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="focus-visible:ring-transparent border text-gray-50"
          placeholder="Write Your Thoughts..."
        />
        {imagePreview && (
          <div className="w-full h-64 flex items-center justify-center">
            <img
              src={imagePreview}
              alt="preview_img"
              className="object-cover h-full w-full rounded-md"
            />
          </div>
        )}
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={fileChangeHandler}
        />
        <Button
          onClick={() => imageRef.current.click()}
          className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] "
        >
          Select image
        </Button>
        {imagePreview &&
          (loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={createPostHandler}
              type="submit"
              className="w-full"
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost