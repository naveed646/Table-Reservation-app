import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import UserProfile from "./UserProfile";

function HeaderAndProfile({ toggleSidebar }) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-gray-50 text-black border py-2 px-4 flex justify-between items-center shadow-lg">
        {/* for mobile... */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="sm:hidden text-2xl text-black"
          >
            ☰
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
            🍽 Piece on Plate
          </h1>
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base cursor-pointer bg-zinc-800 text-white hover:bg-zinc-700 rounded-xl"
            onClick={() => setShowProfile(!showProfile)}
          >
            <FaUserCircle /> Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base cursor-pointer bg-zinc-800 text-white hover:bg-zinc-700 rounded-xl "
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Profile dropdown */}
      {showProfile && <UserProfile profileRef={profileRef} />}
    </>
  );
}

export default HeaderAndProfile;
