import React, { useState } from "react";
import { FaUserCircle, FaCamera, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice"; // ✅ import logout action

function AdminProfile({ menuRef }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux user
  const user = useSelector((state) => state.auth.user);

  // Profile image state (start with user.profilePicture if available)
  const [previewImage, setPreviewImage] = useState(user?.profilePicture || null);

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      // ❗ if you want to persist uploaded profile image in Redux/backend,
      // you can dispatch an update here
      // dispatch(updateUser({ ...user, profilePicture: imageUrl }));
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout()); 
    navigate("/");
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-8 top-8 w-72 bg-gray-200 z-30 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
    >
      {/* Profile Picture */}
      <div className="relative">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-orange-500"
          />
        ) : (
          <FaUserCircle className="text-6xl text-orange-600" />
        )}

        {/* Upload button */}
        <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer">
          <FaCamera className="text-white text-sm" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Admin Info */}
      <h2 className="text-lg font-semibold mt-2">{user?.name || "Unknown"}</h2>
      <p className="text-gray-500 text-sm">{user?.email || "No email"}</p>
      <div className="bg-orange-100 text-orange-700 mt-3 px-4 py-2 rounded-full text-sm">
        Role: <strong>{user?.role || "Administrator"}</strong>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => navigate("/adminsettings")}
        className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-orange-700 transition"
      >
        Settings
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-3 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-red-700 transition flex items-center gap-2"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default AdminProfile;
