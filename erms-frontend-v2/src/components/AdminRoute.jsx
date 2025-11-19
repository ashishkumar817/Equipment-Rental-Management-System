import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({ children }) {
  const { user, token } = useAuth();   // <-- FIXED HERE
  const location = useLocation();

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but not admin
  if (!user.roles || !user.roles.includes("ROLE_ADMIN")) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger fw-bold">Access Denied</h2>
        <p className="text-muted">You do not have permission to view this page.</p>
      </div>
    );
  }

  return children;
}
