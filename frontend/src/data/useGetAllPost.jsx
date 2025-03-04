import { useEffect } from "react";
import { useData } from "../contexts/DataContext";

const useGetAllPost = () => {
    const {setPosts}=useData();
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
              const res = await fetch("http://localhost:3000/api/post/all", {
                method: "GET",
                credentials: "include",
              });

              const data = await res.json();

              if (data.success) {
                console.log(data.posts);
                setPosts(data.posts);
              }
            } catch (error) {
              console.log(error);
            }

        }
        fetchAllPost();
    }, []);
};
export default useGetAllPost;