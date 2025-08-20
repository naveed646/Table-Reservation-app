import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar... */}
      <AdminSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Header... */}
        <div className="p-4">
          <AdminHeader toggleSidebar={toggleSidebar} />
        </div>

        {/* other component... */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
