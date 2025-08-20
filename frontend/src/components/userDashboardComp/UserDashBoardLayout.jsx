import React, { useState } from "react";
import UserHeader from "./UserHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function UserDashBoardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <UserHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <main className="flex-1 overflow-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserDashBoardLayout;
