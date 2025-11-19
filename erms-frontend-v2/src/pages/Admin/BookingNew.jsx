// src/pages/BookingNew.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api/api";


export default function BookingNew() {
  const [form, setForm] = useState({
    customerId: "",
    equipmentId: "",
    startDate: "",
    endDate: "",
    durationType: "DAILY",
    status: "PENDING",
  });
  const [customers, setCustomers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, eqRes] = await Promise.all([
          api.getCustomers(),
          api.getEquipments(),
        ]);
        setCustomers(custRes.data);
        setEquipment(eqRes.data);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
  customerId: parseInt(form.customerId),
  equipmentId: parseInt(form.equipmentId),
  startDate: form.startDate,
  endDate: form.endDate,
  durationType: form.durationType,
  status: form.status
};


  try {
    await api.createBooking(payload);
    alert("Booking created successfully!");
    navigate("/bookings");
  } catch (err) {
    setError("Failed to create booking. Please try again.");
    console.error(err);
  }
};

  return (
    <div className="container py-4">
      <h4>Add New Booking</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Customer</label>
          <select
            className="form-select"
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Equipment</label>
          <select
            className="form-select"
            name="equipmentId"
            value={form.equipmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Equipment</option>
            {equipment.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Start Date</label>
          <DatePicker
          selected={form.startDate ? new Date(form.startDate) : null}
          onChange={(date) =>
            setForm({ ...form, startDate: date.toISOString().split("T")[0] })
          }
          dateFormat="yyyy-MM-dd"
          className="form-control"
        />

        </div>

        <div className="mb-3">
          <label>End Date</label>
                  <DatePicker
          selected={form.endDate ? new Date(form.endDate) : null}
          onChange={(date) =>
            setForm({ ...form, endDate: date.toISOString().split("T")[0] })
          }
          minDate={form.startDate ? new Date(form.startDate) : null}
          dateFormat="yyyy-MM-dd"
          className="form-control"
        />
        </div>

        <div className="mb-3">
          <label>Duration Type</label>
          <select
            className="form-select"
            name="durationType"
            value={form.durationType}
            onChange={handleChange}
          >
            <option value="DAILY">DAILY</option>
            <option value="WEEKLY">WEEKLY</option>
            <option value="MONTHLY">MONTHLY</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Save Booking
        </button>
      </form>
    </div>
  );
}
