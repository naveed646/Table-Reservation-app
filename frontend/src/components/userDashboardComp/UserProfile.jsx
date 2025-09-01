import React from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/auth/authSlice";

function UserProfile({ profileRef }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.auth.user);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.put("/api/users/me/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      dispatch(setUser(res.data)); // ✅ update redux + localStorage
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      ref={profileRef}
      className="absolute right-4 top-16 w-72 bg-gray-200 z-30 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
    >
      {/* Profile Picture */}
      <div className="relative">
        {myUser?.profilePicture ? (
          <img
            src={myUser.profilePicture}
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

      {/* User Info */}
      <h2 className="text-lg font-semibold mt-2">{myUser?.name}</h2>
      <p className="text-gray-500 text-sm">{myUser?.email}</p>

      {/* Settings Button */}
      <button
        onClick={() => navigate("/settings")}
        className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition"
      >
        Settings
      </button>
    </div>
  );
}

export default UserProfile;
