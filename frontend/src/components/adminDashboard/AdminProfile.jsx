import React, { useState } from "react";
import { FaUserCircle, FaCamera, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../../redux/auth/authSlice";
import { uploadAvatar, updateProfile } from "../../api/auth";
import Swal from "sweetalert2";

function AdminProfile({ menuRef }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [previewImage, setPreviewImage] = useState(
    user?.profilePicture ? `http://localhost:8000${user.profilePicture}` : null
  );
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  // Update profile picture
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setPreviewImage(tempUrl);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const updatedUser = await uploadAvatar(formData);
      dispatch(setUser(updatedUser));
      setPreviewImage(`http://localhost:8000${updatedUser.profilePicture}`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Image upload failed!");
    }
  };

  // Update name or email
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleInputBlur = async () => {
    if (name === user.name && email === user.email) return; // nothing changed
    setLoading(true);

    try {
      const updatedUser = await updateProfile({
        name: name.trim(),
        email: email.trim(),
      });
      dispatch(setUser(updatedUser));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    Swal.fire({
      title: "Logout...",
      icon: "success",
      draggable: true,
    });
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
      <input
        type="text"
        value={name}
        onChange={handleInputChange(setName)}
        onBlur={handleInputBlur}
        className="text-lg font-semibold mt-2 text-center border-b border-gray-300 focus:outline-none"
        disabled={loading}
      />
      <input
        type="email"
        value={email}
        onChange={handleInputChange(setEmail)}
        onBlur={handleInputBlur}
        className="text-sm text-gray-500 text-center border-b border-gray-300 focus:outline-none mt-1"
        disabled={loading}
      />

      <div className="bg-orange-100 text-orange-700 mt-3 px-4 py-2 rounded-full text-sm">
        Role: <strong>{user?.role || "Administrator"}</strong>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => navigate("/adminsettings")}
        className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-zinc-600 transition"
      >
        Settings
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-3 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-zinc-600 transition flex items-center gap-2"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default AdminProfile;
