import React, { useState } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { user as initialUser } from "../../data/index";
import { useNavigate } from "react-router-dom";

function UserProfile({ profileRef }) {
  const [user, setUser] = useState(initialUser);
  const [previewImage, setPreviewImage] = useState(user.profilePicture || null);
  const navigate = useNavigate();

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setUser({ ...user, profilePicture: imageUrl });
    }
  };

  return (
    <div
      ref={profileRef}
      className="absolute right-4 top-16 w-72 bg-gray-200 z-30 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
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

      {/* User Info */}
      <h2 className="text-lg font-semibold mt-2">{user.name}</h2>
      <p className="text-gray-500 text-sm">{user.email}</p>
      <div className="bg-orange-100 text-orange-700 mt-3 px-4 py-2 rounded-full text-sm">
        Loyalty Points: <strong>{user.loyaltyPoints}</strong>
      </div>

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
