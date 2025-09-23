import React from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/auth/authSlice";
import { uploadAvatar } from "../../api/auth";

function UserProfile({ profileRef }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.auth.user);

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const updatedUser = await uploadAvatar(formData);
      dispatch(setUser(updatedUser));
      alert("Avatar updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Image upload failed!");
    }
  };

  return (
    <div
      ref={profileRef}
      className="absolute right-18 mt-15 w-64 bg-white rounded-lg shadow-lg p-4 z-50"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={
              myUser?.profilePicture
                ? `http://localhost:8000${myUser.profilePicture}`
                : "fallback-image.jpg"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />

          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full cursor-pointer"
          >
            <FaCamera size={14} />
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <h2 className="mt-3 text-lg font-semibold">{myUser?.name}</h2>
        <p className="text-sm mt-2 text-gray-500">{myUser?.email}</p>
        <button
          onClick={() => navigate("/settings")}
          className="mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-600"
        >
          Settings
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
