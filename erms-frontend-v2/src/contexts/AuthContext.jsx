// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(localStorage.getItem("auth_token") || null);

  // -----------------------------------------------------------
  // SAVE TOKEN IN LOCAL STORAGE
  // -----------------------------------------------------------
  useEffect(() => {
    if (token) localStorage.setItem("auth_token", token);
    else localStorage.removeItem("auth_token");
  }, [token]);

  // -----------------------------------------------------------
  // SAVE USER + customerId
  // -----------------------------------------------------------
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.customerId) {
        localStorage.setItem("customer_id", user.customerId);
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("customer_id");
    }
  }, [user]);

  // -----------------------------------------------------------
  // ROLE CHECKS 
  // -----------------------------------------------------------
  const isAdmin = () => user?.roles?.includes("ROLE_ADMIN");

  // Prevent admin from being counted as normal user
  const isUser = () =>
    user?.roles?.includes("ROLE_USER") && !isAdmin();

  // -----------------------------------------------------------
  // LOGIN
  // -----------------------------------------------------------
  const login = async ({ username, password }) => {
    try {
      const res = await api.login({ username, password });
      const data = res.data;

      // Backend returns: { token: "...", user: {...} }
      setToken(data.token);
      setUser(data.user);

      if (data.user.roles.includes("ROLE_ADMIN")) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err?.response?.data?.message || "Invalid credentials",
      };
    }
  };

  // -----------------------------------------------------------
  // REGISTER
  // -----------------------------------------------------------
  const register = async (data) => {
    try {
      const res = await api.register(data);
      return { ok: true, data: res.data };
    } catch (err) {
      return {
        ok: false,
        error: err?.response?.data?.message || "Registration failed",
      };
    }
  };

  // -----------------------------------------------------------
  // LOGOUT
  // -----------------------------------------------------------
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("customer_id");

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register,
        isAdmin,
        isUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
