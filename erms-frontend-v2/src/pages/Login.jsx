import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await login(form);
    if (!res.ok) setError(res.error);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #004aad, #00c6ff)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "18px",
          backdropFilter: "blur(10px)",
          padding: "40px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.7s ease",
        }}
      >
        <h2 className="text-center text-white fw-bold mb-3">Welcome Back</h2>
        <p className="text-center text-light mb-4">Login to continue</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="text-white fw-semibold">Username / Email</label>
            <input
              type="text"
              name="username"
              className="form-control form-control-lg"
              value={form.username}
              onChange={change}
              required
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "none",
                color: "#fff",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="text-white fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              value={form.password}
              onChange={change}
              required
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "none",
                color: "#fff",
              }}
            />
          </div>

          <button
            className="btn btn-light w-100 mt-3"
            style={{
              padding: "12px",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
  


