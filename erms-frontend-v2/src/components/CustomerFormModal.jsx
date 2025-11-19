import React, { useState, useEffect } from "react";

export default function CustomerFormModal({ show, onClose, onSubmit, editing }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const change = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>{editing ? "Edit Customer" : "Add Customer"}</h3>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
          <input name="name" className="form-control" placeholder="Name" onChange={change} value={form.name} required />
          <br />
          <input name="email" className="form-control" placeholder="Email" onChange={change} value={form.email} required />
          <br />
          <input name="phone" className="form-control" placeholder="Phone" onChange={change} value={form.phone} required />
          <br />
          <textarea name="address" className="form-control" placeholder="Address" onChange={change} value={form.address}></textarea>
          <br />

          <button className="btn btn-success w-100">{editing ? "Update" : "Create"}</button>
        </form>

        <button className="btn btn-danger mt-3 w-100" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
