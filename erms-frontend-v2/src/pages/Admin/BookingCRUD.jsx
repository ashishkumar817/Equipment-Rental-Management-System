import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function BookingCRUD() {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const [form, setForm] = useState({
    id: "",
    customerId: "",
    equipmentId: "",
    startDate: "",
    endDate: "",
    durationType: "DAILY",
    status: "PENDING",
  });

  const [editing, setEditing] = useState(false);

  // ===========================
  // FETCH ALL DATA ON LOAD
  // ===========================
  useEffect(() => {
    loadBookings();
    loadCustomers();
    loadEquipment();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await api.getBookings(); // uses Render URL
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    }
  };

  const loadCustomers = async () => {
    try {
      const res = await api.getCustomers(); // uses Render URL
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to load customers:", err);
    }
  };

  const loadEquipment = async () => {
    try {
      const res = await api.getEquipments(); // uses Render URL
      setEquipment(res.data);
    } catch (err) {
      console.error("Failed to load equipment:", err);
    }
  };

  // ===========================
  // HANDLE INPUT CHANGE
  // ===========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===========================
  // ADD / UPDATE BOOKING
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      customerId: form.customerId,
      equipmentId: form.equipmentId,
      startDate: form.startDate,
      endDate: form.endDate,
      durationType: form.durationType,
      status: form.status,
    };

    try {
      if (editing) {
        await api.updateBooking(form.id, data);
        setEditing(false);
      } else {
        await api.createBooking(data);
      }

      setForm({
        id: "",
        customerId: "",
        equipmentId: "",
        startDate: "",
        endDate: "",
        durationType: "DAILY",
        status: "PENDING",
      });

      loadBookings();
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("Booking save failed.");
    }
  };

  // ===========================
  // EDIT BOOKING
  // ===========================
  const handleEdit = (b) => {
    setForm({
      id: b.id,
      customerId: b.customer?.id || "",
      equipmentId: b.equipment?.id || "",
      startDate: b.startDate,
      endDate: b.endDate,
      durationType: b.durationType,
      status: b.status,
    });
    setEditing(true);
  };

  // ===========================
  // DELETE BOOKING
  // ===========================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      await api.deleteBooking(id);
      loadBookings();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ===========================
  // RENDER
  // ===========================
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Booking Management</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
        {/* Customer */}
        <select
          name="customerId"
          value={form.customerId}
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

        {/* Equipment */}
        <select
          name="equipmentId"
          value={form.equipmentId}
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
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <select
          name="durationType"
          value={form.durationType}
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

      {/* TABLE */}
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
              <td className="border px-4 py-2">{b.customer?.name}</td>
              <td className="border px-4 py-2">{b.equipment?.name}</td>
              <td className="border px-4 py-2">{b.startDate}</td>
              <td className="border px-4 py-2">{b.endDate}</td>
              <td className="border px-4 py-2">{b.durationType}</td>
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
