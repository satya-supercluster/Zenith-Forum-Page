import axios from "axios";
import { useEffect } from "react";
import { useData } from "../contexts/DataContext";

const useGetAllPost = () => {
    const {setPosts}=useData();
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get('https://localhost:3000/api/post/all', { withCredentials: true });
                if (res.data.success) { 
                    console.log(res.data.posts);
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, []);
};
export default useGetAllPost;