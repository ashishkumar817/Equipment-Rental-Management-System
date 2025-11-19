import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/api";

export default function BookingCRUD() {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState({
    id: "",
    customeriId: "",
    equipmentId: "",
    startDate: "",
    endDate: "",
    durationType: "DAILY",
    status: "PENDING",
  });
  const [editing, setEditing] = useState(false);

  // ✅ Fetch all data on page load
  useEffect(() => {
    fetchBookings();
    fetchCustomers();
    fetchEquipment();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get("/api/bookings");
    setBookings(res.data);
  };

  const fetchCustomers = async () => {
    const res = await axios.get("/api/customers");
    setCustomers(res.data);
  };

  const fetchEquipment = async () => {
    const res = await axios.get("/api/equipment");
    setEquipment(res.data);
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update Booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`/api/bookings/${form.id}`, form);
      setEditing(false);
    } else {
      await axios.post("/api/bookings", form);
    }
    setForm({
      id: "",
      customer_id: "",
      equipment_id: "",
      start_date: "",
      end_date: "",
      duration_type: "DAILY",
      status: "PENDING",
    });
    fetchBookings();
  };

  // ✅ Edit Booking
  const handleEdit = (booking) => {
    setForm(booking);
    setEditing(true);
  };

  // ✅ Delete Booking
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      await axios.delete(`/api/bookings/${id}`);
      fetchBookings();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Booking Management</h1>

      {/* 📝 Booking Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          name="equipment_id"
          value={form.equipment_id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Equipment</option>
          {equipment.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <select
          name="duration_type"
          value={form.duration_type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded col-span-2 hover:bg-blue-700"
        >
          {editing ? "Update Booking" : "Add Booking"}
        </button>
      </form>

      {/* 📋 Booking Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Customer</th>
            <th className="py-2 px-4 border">Equipment</th>
            <th className="py-2 px-4 border">Start</th>
            <th className="py-2 px-4 border">End</th>
            <th className="py-2 px-4 border">Duration</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="text-center">
              <td className="border px-4 py-2">{b.id}</td>
              <td className="border px-4 py-2">
                {customers.find((c) => c.id === b.customer_id)?.name || "N/A"}
              </td>
              <td className="border px-4 py-2">
                {equipment.find((e) => e.id === b.equipment_id)?.name || "N/A"}
              </td>
              <td className="border px-4 py-2">{b.start_date}</td>
              <td className="border px-4 py-2">{b.end_date}</td>
              <td className="border px-4 py-2">{b.duration_type}</td>
              <td className="border px-4 py-2">{b.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
  
}
