import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex">
      <div className="flex flex-col w-full">
        <Navbar />
        <main className="p-4 h-screen overflow-auto bg-[#EFF3FF] font-raleway">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
