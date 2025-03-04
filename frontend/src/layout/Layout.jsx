import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import LeftSidebar from "./LeftSideBar"
import { useAuth } from "../contexts/AuthContext";
const Layout = () => {
  const {auth} =useAuth();
  const user=auth?.user;
  return (
    <div>
      {user? <LeftSidebar />:null}
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
