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
