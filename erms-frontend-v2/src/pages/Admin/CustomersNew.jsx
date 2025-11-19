// src/pages/CustomersNew.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function CustomersNew() {
  <Route
  path="/customers/new"
  element={
    <ProtectedRoute>
      <CustomersNew />
    </ProtectedRoute>
  }
/>

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (!form.name.trim()) {
    setError("Name is required");
    return;
  }
  if (!form.email.trim()) {
    setError("Email is required");
    return;
  }

  setLoading(true);
  try {
    await api.createCustomer({
      name: form.name,
      company: form.company || null,
      email: form.email,
      phone: form.phone || null,
      address: form.address || null,
    });

    // ✅ success navigation
    navigate("/customers", { state: { refresh: true }, replace: true });
  } catch (err) {
    console.error("Create customer failed:", err);
    const msg = err?.response?.data?.message || err?.response?.data || err.message || "Create failed";
    setError(msg);

    if (err?.response?.status === 401) {
      navigate("/login", { replace: true });
    }
  } finally {
    setLoading(false);
  }
  await api.createCustomer({
  name: form.name,
  email: form.email,
  phone: form.phone,
  address: form.address,
});

};


  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Add Customer</h4>
      </div>

      {error && <div className="alert alert-danger">{String(error)}</div>}

      <form onSubmit={handleSubmit} className="card p-3">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name *</label>
            <input name="name" value={form.name} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Company</label>
            <input name="company" value={form.company} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-12">
            <label className="form-label">Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} className="form-control" rows="3" />
          </div>

          <div className="col-12 d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving…" : "Save Customer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
