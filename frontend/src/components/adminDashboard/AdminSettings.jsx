import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setUser } from "../../redux/auth/authSlice";
import { uploadAvatar, updateProfile } from "../../api/auth";

function AdminSettings() {
  const dispatch = useDispatch();
  const myAdmin = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: myAdmin?.name || "",
    email: myAdmin?.email || "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(
    myAdmin?.profilePicture
      ? `http://localhost:8000${myAdmin.profilePicture}`
      : ""
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("avatar", file);

    try {
      const updatedUser = await uploadAvatar(formDataImg);
      dispatch(setUser(updatedUser));
      setAvatarPreview(`http://localhost:8000${updatedUser.profilePicture}`);
      alert("Avatar updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Image upload failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password && !formData.currentPassword) {
      alert("Current password is required to change password!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      if (formData.password) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.password;
        payload.confirmPassword = formData.confirmPassword;
      }

      const updatedUser = await updateProfile(payload);
      dispatch(setUser(updatedUser.user));

      if (formData.password) {
        localStorage.setItem("token", updatedUser.token);
        alert("Password updated successfully!");
        setFormData({
          ...formData,
          currentPassword: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || err.message || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Account Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <input type="text" style={{ display: "none" }} />
          <input type="password" style={{ display: "none" }} />

          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <img
              src={avatarPreview || "change"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div>
              <label
                htmlFor="avatarUpload"
                className="cursor-pointer px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Change Avatar
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full border p-2 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Current Password */}
          <div className="relative">
            <label className="block text-sm font-medium">
              Current Password
            </label>
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg pr-10"
              placeholder="Required to change password"
              autoComplete="new-password"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium">New Password</label>
            <input
              type={showNew ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg pr-10"
              placeholder="Leave blank to keep unchanged"
              autoComplete="new-password"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg pr-10"
              autoComplete="new-password"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-zinc-600 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSettings;
