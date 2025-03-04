import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  MessageCircle,
  PlusSquare,
  User,
  Menu,
  LogOut,
  FileCode
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../components/Global/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Global/avatar";
import { Button } from "../components/Global/button";
import { useToggle } from "../contexts/ToggelContext";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const {
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isCreatePostOpen,
    setIsCreatePostOpen,
  } = useToggle();

  const {auth}=useAuth();
  const user=auth?.user;

  const {likeNotification} =useData();

  const navigate = useNavigate();

  // Check if mobile view based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setExpanded(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setIsCreatePostOpen(!isCreatePostOpen);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    }
  };

  const logoutHandler=async()=>{
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/logout",
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  }

  const menuItems = [
    { name: "Home", icon: Home, },
    { name: "Create", icon: PlusSquare, },
    { name: "Code Room", icon: FileCode, },
    { name: "Messages", icon: MessageCircle, },
    { name: "Profile", icon: User, },
    { name: "Search", icon: Search, },
  ];

  // Desktop sidebar
  const DesktopSidebar = () => (
    <motion.div
      className="fixed pt-16 left-0 top-0 h-screen  border-r border-gray-200 flex flex-col z-50 bg-[#101a3b] bg-opacity-95"
      animate={{
        width: expanded ? "175px" : "70px",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Hamburger toggle on desktop view */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded-full flex items-center justify-between"
        >
          <Menu size={24} />
          {expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="ml-4 text-sm font-medium"
            >
              Menu
            </motion.span>
          )}
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="py-2">
          {menuItems.map((item) => (
            <motion.li key={item.name} className="mb-1">
              <motion.a
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sidebarHandler(item.name)}
                className="flex items-center px-4 py-3 rounded-lg mx-2 cursor-pointer"
              >
                <item.icon size={24} />
                {item.name === "Notifications" &&
                  likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                        >
                          {likeNotification.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div>
                          {likeNotification.length === 0 ? (
                            <p>No new notification</p>
                          ) : (
                            likeNotification.map((notification) => {
                              return (
                                <div
                                  key={notification.userId}
                                  className="flex items-center gap-2 my-2"
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        notification.userDetails?.profilePicture
                                      }
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm">
                                    <span className="font-bold">
                                      {notification.userDetails?.username}
                                    </span>{" "}
                                    liked your post
                                  </p>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 text-sm font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded-full  flex items-center justify-between"
        >
          <LogOut size={24} />
          {expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="ml-4 text-sm font-medium"
            >
              Logout
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );

  // Mobile navbar with hamburger toggle
  const MobileNavbar = () => (
    <div className="w-full">
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-screen shadow-lg z-50 bg-opacity-95 bg-[#0c1631] pt-16"
          >

            <div className="overflow-y-auto">
              <ul className="py-2">
                {menuItems.map((item) => (
                  <motion.li key={item.name} className="mb-1">
                    <motion.a
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-3 cursor-pointer"
                      onClick={toggleMobileMenu}
                    >
                      <item.icon size={24} />
                      <span className="ml-4 text-sm font-medium">
                        {item.name}
                      </span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="p-4 border-t border-gray-200 absolute bottom-0 w-full">
              <motion.a
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-3 rounded-lg cursor-pointer"
              >
                <LogOut size={24} />
                <span className="ml-4 text-sm font-medium">Logout</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when mobile menu is open */}
      {isMobileSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-40"
          onClick={toggleMobileMenu}
        />
      )}
    </div>
  );

  return <>{isMobile ? <MobileNavbar /> : <DesktopSidebar />}</>;
};

export default Sidebar;
