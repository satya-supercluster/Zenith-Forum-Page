import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import BottomBar from "./BottomBar";
const Layout = () => {
  const { user } = useAuth();
  return (
    <div>
      <Navbar user={user} />
      <div>
        <Outlet />
      </div>
      <BottomBar/>
    </div>
  );
};
export default Layout;
