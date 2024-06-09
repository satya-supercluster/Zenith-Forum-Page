import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
const Layout = () => {
  const { user } = useAuth();
  return (
    <div>
      <Navbar user={user} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
