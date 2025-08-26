import { NavLink } from "react-router-dom";
import { adminlinks } from "../../data";

export default function AdminSidebar({ isOpen, closeSidebar }) {


  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-gray-50 text-black w-64 p-6 shadow-md transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-8">Manage Reservations</h2>
        <nav className="flex flex-col gap-4">
          {adminlinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              onClick={closeSidebar}  
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-black text-white" : "hover:bg-zinc-200"
                }`
              }
            >
              <link.icon/>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
          onClick={closeSidebar} 
        ></div>
      )}
    </>
  );
}
