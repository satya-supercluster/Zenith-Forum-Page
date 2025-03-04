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
import { useToggle } from "../contexts/ToggelContext";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useToggle();

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

  const handleLogout=()=>{}

  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Create", icon: PlusSquare },
    { name: "Code Room", icon: FileCode },
    { name: "Messages", icon: MessageCircle },
    { name: "Profile", icon: User },
    { name: "Search", icon: Search },
  ];

  // Desktop sidebar
  const DesktopSidebar = () => (
    <motion.div
      className="fixed pt-16 left-0 top-0 h-screen  border-r border-gray-200 flex flex-col z-50 bg-[#101a3b] bg-opacity-95"
      animate={{
        width: expanded ? "240px" : "70px",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Hamburger toggle on desktop view */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded-full"
        >
          <Menu size={24} />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="py-2">
          {menuItems.map((item) => (
            <motion.li key={item.name} className="mb-1">
              <motion.a
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-3 rounded-lg mx-2 cursor-pointer"
              >
                <item.icon size={24} />
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
