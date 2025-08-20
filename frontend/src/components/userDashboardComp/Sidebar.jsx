
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { TfiAlignJustify } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import {dashNavLinks} from "../../data/index"

function Sidebar({ open, setOpen }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed sm:static top-0 left-0 h-full bg-gray-50 text-black 
      transition-transform duration-300 shadow-md p-4
      ${open ? "translate-x-0" : "-translate-x-full"} 
      sm:translate-x-0 ${collapsed ? "w-18" : "w-60"}`}
    >
      
      {/* for desktop.... */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden sm:block absolute right-0 top-0 text-black p-1"
      >
        {collapsed ? (
          <TfiAlignJustify className="text-xl mr-6 cursor-pointer "/>
        ) : (
          <TiDeleteOutline className="text-xl cursor-pointer " />
        )}
      </button>

      {/* for mobile.... */}
      <button
        onClick={() => setOpen(false)}
        className="sm:hidden absolute right-3 top-3  text-black text-2xl"
      >
        <TiDeleteOutline className="text-black" />
      </button>

      {/* Sidebar Title */}
      {!collapsed && (
        <h1 className="text-black font-bold mt-8 sm:mt-4 text-center">
          Booking & Reservation
        </h1>
      )}

      {/* Navigation */}
      
     <nav className="space-y-2 mt-5">
      {dashNavLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `flex items-center gap-2 cursor-pointer w-full text-left p-2 rounded 
            
            ${isActive ? "bg-black text-white" : "hover:bg-zinc-200"}`
          }
        >
          <link.icon className="text-2xl" /> {/* render the component */}
          {!collapsed && link.label}
        </NavLink>
      ))}
    </nav>
    </aside>
  );
}

export default Sidebar;
