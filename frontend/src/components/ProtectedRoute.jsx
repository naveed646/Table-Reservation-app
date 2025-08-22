import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const payload = token.split(".")[1];
    if (!payload) throw new Error("Invalid token");

    const decoded = JSON.parse(atob(payload));

    // Token expiration chec
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }
    // for check the role...

    if (role && decoded.role !== role) return <Navigate to="/" replace />;

    return children;
  } catch (err) {
    console.error("Token decode error:", err);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
