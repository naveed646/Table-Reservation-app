import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/auth", 
});

// for registerUser.apply.call.

export const registerUser = async (userData) => {
  try {
    const res = await API.post("/register", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};


// for login...
export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/login", credentials);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};


// Helper → always attach token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // since you already save token
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Upload avatar
export const uploadAvatar = async (formDataImg) => {
  try {
    const res = await API.put("/me/avatar", formDataImg, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeaders(),
      },
    });
    return res.data; // updated user
  } catch (err) {
    throw err.response?.data || { message: "Upload failed" };
  }
};

// Update profile info (name, email, etc.)
export const updateProfile = async (profileData) => {
  try {
    const res = await API.put("/me", profileData, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Update failed" };
  }
};

// Change password
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const res = await API.put(
      "/me",
      { oldPassword, newPassword },
      { headers: getAuthHeaders() }
    );

    // 🚨 Important: clear token, force re-login
    localStorage.removeItem("token");

    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Password update failed" };
  }
};


export default API;

