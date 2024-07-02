// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="fixed top-0 w-full bg-white lg:px-36 text-gray-800 shadow-md flex items-center p-2 z-50">
      <div className="flex-1">
        <Link to="/" className="text-2xl sm:px-10 px-5 font-bold text-gray-800">
          Zenith
        </Link>
      </div>
      <div className="flex-1 max-[500px]:hidden flex bg-slate-300 items-center justify-center relative rounded-lg border border-gray-300 overflow-hidden">
        <FontAwesomeIcon icon={faSearch} className=" pl-2 text-gray-500" />
        <input
          type="search"
          placeholder="Search Topics"
          className="w-full max-w-md p-2 bg-slate-300 placeholder:text-gray-500 text-gray-800 focus:outline-none "
        />
      </div>
      <div className="flex-1 flex justify-end items-center">
        <FontAwesomeIcon
          icon={faBell}
          className="text-gray-800 mr-4 text-2xl cursor-pointer"
        />
        <img
          src={user ? user.avatar : "/avatar.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-gray-500"
        />
      </div>
    </nav>
  );
};

export default Navbar;
