import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({user}) => {
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
