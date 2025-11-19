// src/components/UserRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function UserRoute({ children }) {
  const { user, token } = useAuth();
  const location = useLocation();

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin tries to open user-only routes
  if (user.roles && user.roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Normal user -> allow
  return children;
}
