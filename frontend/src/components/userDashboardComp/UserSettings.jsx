import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/auth/authSlice";
import { FaCamera } from "react-icons/fa";

function Settings() {
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: myUser?.name || "",
    email: myUser?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(myUser?.profilePicture || null);
  const [loading, setLoading] = useState(false);

  // 🔹 Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("avatar", file);

    try {
      const res = await axios.put("/api/users/me/avatar", formDataImg, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      dispatch(setUser(res.data));
      setAvatarPreview(res.data.profilePicture);
    } catch (err) {
      console.error(err);
      alert("Image upload failed!");
    }
  };

  // 🔹 Handle save profile info
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put("/api/users/me", formData, { withCredentials: true });
      dispatch(setUser(res.data)); // updates redux + localStorage
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex bg-white shadow-lg rounded-xl mt-10 overflow-hidden">
      {/* Left side: Profile Card */}
      <div className="w-1/3 bg-gray-100 flex flex-col items-center p-6 border-r">
        <div className="relative">
          <img
            src={avatarPreview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-orange-500"
          />
          <label className="absolute bottom-2 right-2 bg-orange-600 p-2 rounded-full cursor-pointer">
            <FaCamera className="text-white text-sm" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <h2 className="mt-4 text-xl font-bold">{formData.name}</h2>
        <p className="text-gray-600">{formData.email}</p>
      </div>

      {/* Right side: Editable Info */}
      <div className="w-2/3 p-8">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-lg"
            />
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
