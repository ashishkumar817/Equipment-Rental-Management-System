// src/pages/EquipmentDetails.jsx
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from 'react-router-dom';
import api from '../api/api';

export default function EquipmentDetails() {
  const { id } = useParams();
  const [eq, setEq] = useState(null);
  const [msg, setMsg] = useState('');
  const { user } = useAuth();
  const [form, setForm] = useState({
  startDate: null,
  endDate: null,
  durationType: "daily"
});


  useEffect(() => {
    if (!id) return;

    api.getEquipment(id)
      .then(res => setEq(res.data))
      .catch(err => console.error("Error fetching equipment:", err));
  }, [id]);

  const change = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ⭐ FIXED — Now includes customerId, equipmentId, and uppercased durationType
 const submit = async (e) => {
  e.preventDefault();
  setMsg("");

  const customerId = localStorage.getItem("customer_id");
  console.log("🔎 Customer ID:", customerId);

  if (!customerId) {
    setMsg("Customer ID missing — login again.");
    return;
  }

  // Convert JS Date → YYYY-MM-DD for backend
  const formatDate = (date) => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
  };

  const payload = {
  customerId: Number(customerId),
  equipmentId: Number(id),
  startDate: formatDate(form.startDate),
  endDate: formatDate(form.endDate),
  durationType: form.durationType.toUpperCase(),
  status: "PENDING"
};

  console.log("📤 Booking Payload:", payload);

  try {
    await api.createBooking(payload);
    setMsg("Booking requested successfully.");
    setForm({ startDate: null, endDate: null, durationType: "daily" });
  } catch (err) {
    console.error("❌ Booking error:", err);
    setMsg("Booking failed.");
  }
};


  if (!eq) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row">

        {/* IMAGE */}
        <div className="col-md-6">
          <img
            src={eq.imageUrl || '/placeholder.jpg'}
            alt={eq.name}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-6">
          <h2 className="mb-3">{eq.name.toUpperCase()}</h2>

          <p><strong>Status:</strong> {eq.status}</p>
          <p><strong>Type:</strong> {eq.type}</p>
          <p><strong>Specs:</strong> {eq.specs || "—"}</p>

          <h5 className="mt-4">Rates:</h5>
          <p>Daily: ₹{eq.dailyRate}</p>
          <p>Weekly: ₹{eq.weeklyRate}</p>
          <p>Monthly: ₹{eq.monthlyRate}</p>

          <hr />

          {/* BOOKING FORM */}
          <h4 className="mb-3">Request Booking</h4>

          <form onSubmit={submit} >
            <div className="mb-3">
            <label>Start Date</label>
            <DatePicker 
              selected={form.startDate}
              onChange={(date) => setForm({ ...form, startDate: date })}
              className="form-control"
              dateFormat="dd-MM-yyyy"
              placeholderText="Select start date"
            />
          </div>


            <div className="mb-3">
            <label>End Date</label>
            <DatePicker
              selected={form.endDate}
              onChange={(date) => setForm({ ...form, endDate: date })}
              className="form-control"
              dateFormat="dd-MM-yyyy"
              placeholderText="Select end date"
            />
          </div>


            <div className="mb-3">
              <label>Duration Type</label>
              <select
                name="durationType"
                className="form-select"
                value={form.durationType}
                onChange={change}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <button className="btn btn-success w-100">Request Booking</button>
          </form>

          {msg && (
            <div className="alert alert-info mt-3">
              {msg}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
