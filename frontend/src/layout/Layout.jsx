import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import LeftSidebar from "./LeftSideBar"
const Layout = () => {

  return (
    <div>
      <LeftSidebar />
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
