import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import BottomBar from "./BottomBar";
import Website_DownlMsg from "./Website_DownlMsg";
const Layout = () => {
  const { user } = useAuth();
  return (
    <div>
      <Website_DownlMsg/>
      {/* <Navbar user={user} />
      <div>
        <Outlet />
      </div>
      <BottomBar/> */}
    </div>
  );
};
export default Layout;
