import { FaUserShield, FaSignOutAlt, FaCog, FaBars } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminProfile from "./AdminProfile";

export default function AdminHeader({ toggleSidebar }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <header className="bg-gray-50 flex justify-between items-center p-4 rounded-xl shadow-md">
      {/* for mbile toggler */}
      <button onClick={toggleSidebar} className="md:hidden text-2xl text-black">
        <FaBars />
      </button>

      {/* Title */}
      <h1 className="text-lg md:text-xl font-bold text-black">
        Welcome, Guest
      </h1>

      {/* Admin Profile */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 cursor-pointer text-black font-semibold"
        >
          <FaUserShield className="text-2xl hover:scale-110" />
          <span className="hidden sm:block">Admin</span>
        </button>

        {showMenu && (
         <AdminProfile menuRef={menuRef} />
        )}
      </div>
    </header>
  );
}
