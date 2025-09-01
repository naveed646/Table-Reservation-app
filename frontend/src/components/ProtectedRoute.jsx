import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const payload = token.split(".")[1];
    if (!payload) throw new Error("Invalid token");

    const decoded = JSON.parse(atob(payload));

    // Check token expiry
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }

    // Check role
    if (role && decoded.role !== role) return <Navigate to="/" replace />;

    // ✅ Important: render nested routes via <Outlet />
    return <Outlet />;
  } catch (err) {
    console.error("Token decode error:", err);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
