import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const res = await register(form);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    setMsg("Registration successful! You can login now.");
    setForm({
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      address: ""
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #00c6ff, #004aad)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "480px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "18px",
          padding: "40px",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          animation: "fadeIn 0.7s ease",
        }}
      >
        <h2 className="text-center text-white fw-bold mb-3">Create Account</h2>
        <p className="text-center text-light mb-4">
          Fill out the form to get started
        </p>

        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="text-white fw-semibold">Full Name</label>
            <input
              name="name"
              className="form-control form-control-lg"
              value={form.name}
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
            <label className="text-white fw-semibold">Email</label>
            <input
              name="email"
              type="email"
              className="form-control form-control-lg"
              value={form.email}
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
            <label className="text-white fw-semibold">Username</label>
            <input
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
              name="password"
              type="password"
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

          <div className="mb-3">
            <label className="text-white fw-semibold">Phone</label>
            <input
              name="phone"
              className="form-control form-control-lg"
              value={form.phone}
              onChange={change}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "none",
                color: "#fff",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="text-white fw-semibold">Address</label>
            <textarea
              name="address"
              className="form-control form-control-lg"
              value={form.address}
              onChange={change}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "none",
                color: "#fff",
                height: "120px",
              }}
            ></textarea>
          </div>

          <button
            className="btn btn-light w-100 mt-3"
            style={{
              padding: "12px",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
