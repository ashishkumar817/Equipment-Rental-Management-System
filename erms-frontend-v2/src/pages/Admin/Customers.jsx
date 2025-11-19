// src/pages/Customers.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch customers
  const loadCustomers = async () => {
    try {
      const res = await api.getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to load customers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add customer
  const handleAdd = () => {
    setForm({
      id: null,
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setEditMode(false);
    setShowForm(true);
  };

  // Edit customer
  const handleEdit = (customer) => {
    setForm(customer);
    setEditMode(true);
    setShowForm(true);
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await api.deleteCustomer(id);
      loadCustomers();
    } catch (err) {
      console.error("Failed to delete customer", err);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await api.updateCustomer(form.id, form);
      } else {
        await api.createCustomer(form);
      }

      setShowForm(false);
      loadCustomers();
    } catch (err) {
      console.error("Failed to save customer", err);
    }
  };

  if (loading)
    return <div className="container py-5">Loading customers...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Customers</h4>
        <button className="btn btn-primary" onClick={handleAdd}>
          + Add Customer
        </button>
      </div>

      {/* CUSTOMER TABLE */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th style={{ width: "160px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>

              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FORM MODAL */}
      {showForm && (
        <div className="card shadow p-4 mt-4">
          <h4>{editMode ? "Edit Customer" : "Add Customer"}</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>
              <input
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Address</label>
              <input
                name="address"
                className="form-control"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success me-2">
              {editMode ? "Update" : "Save"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
