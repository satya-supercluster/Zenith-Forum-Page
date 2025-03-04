import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Menu, User } from "lucide-react";
import { useToggle } from "../../contexts/ToggelContext";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = ({ isLoggedIn = false }) => {

  const {auth} =useAuth();
  const user=auth?.user;

  const [isMobile, setIsMobile] = useState(false);
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useToggle();

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div
      className={`w-full bg-[#0c1631] text-white fixed top-0 z-50 md:hover:shadow-blue-400 shadow-gray-800 shadow-md`}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo or Hamburger */}
          {isMobile ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              className="p-2"
            >
              <Menu size={24} />
            </motion.button>
          ) : (
            <motion.div className="text-xl font-bold text-[#3b82f6]">
              &lt;ZENITH&gt;
            </motion.div>
          )}

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Posts..."
                className="w-full py-2 px-4 pl-10 bg-[#101a3b] rounded-full text-white  focus:border-gray-300 border-2 border-gray-500 placeholder-gray-300 outline-none"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Right: Sign In or Avatar */}
          {user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full cursor-pointer"
            >
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3b82f6] hover:bg-blue-600 py-2 px-4 rounded-md font-medium"
            >
              Sign In
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
