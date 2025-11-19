// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalEquipment: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("AdminDashboard.jsx is running");
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    setError(null);

    try {
      console.log("Requesting /admin/stats via api.getAdminStats()");
      const res = await api.getAdminStats();

      console.log("/admin/stats response:", res);
      if (res && res.data) {
        const data = res.data;

        setStats({
          totalCustomers: Number(data.totalCustomers || data.total_customers || 0),
          totalEquipment: Number(data.totalEquipment || data.total_equipment || 0),
          totalBookings: Number(data.totalBookings || data.total_bookings || 0),
          totalRevenue: Number(data.totalRevenue || data.total_revenue || 0),
        });

        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("/admin/stats failed:", err);
    }

    // FALLBACK
    try {
      console.log("FALLBACK: fetching individual endpoints");

      const [customersRes, equipmentRes, bookingsRes, paymentsRes] = await Promise.all([
        api.getCustomers().catch(() => ({ data: [] })),
        api.getEquipments().catch(() => ({ data: [] })),
        api.getBookings().catch(() => ({ data: [] })),
        api.getPayments().catch(() => ({ data: [] })),
      ]);

      const totalCustomers = customersRes.data.length || 0;
      const totalEquipment = equipmentRes.data.length || 0;
      const totalBookings = bookingsRes.data.length || 0;
      const totalRevenue = (paymentsRes.data || []).reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
      );

      setStats({
        totalCustomers,
        totalEquipment,
        totalBookings,
        totalRevenue,
      });

      setLoading(false);
    } catch (err) {
      console.error("Fallback error:", err);
      setError("Unable to load dashboard stats.");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <h4>Loading dashboard…</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">

  {/* Premium Heading */}
  <h2 
    className="mb-4 text-center fw-bold"
    style={{
      fontSize: "2.2rem",
      background: "linear-gradient(90deg, #004aad, #00d4ff)",
      WebkitBackgroundClip: "text",
      color: "transparent"
    }}
  >
    Admin Dashboard
  </h2>

  {error && (
    <div className="alert alert-danger">{error}</div>
  )}

  <div className="row g-4">

  <div className="col-md-3">
    <div
      className="p-4"
      style={{
        borderRadius: "18px",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.75)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1), inset 0px 0px 15px rgba(255,255,255,0.5)"
      }}
    >
      <h5 className="text-muted">Total Customers</h5>
      <h2 className="fw-bold" style={{ color: "#007bff" }}>
        {stats.totalCustomers}
      </h2>
    </div>
  </div>

  <div className="col-md-3">
    <div
      className="p-4"
      style={{
        borderRadius: "18px",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.75)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1), inset 0px 0px 15px rgba(255,255,255,0.5)"
      }}
    >
      <h5 className="text-muted">Total Equipment</h5>
      <h2 className="fw-bold" style={{ color: "#E9A000" }}>
        {stats.totalEquipment}
      </h2>
    </div>
  </div>

  <div className="col-md-3">
    <div
      className="p-4"
      style={{
        borderRadius: "18px",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.75)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1), inset 0px 0px 15px rgba(255,255,255,0.5)"
      }}
    >
      <h5 className="text-muted">Total Bookings</h5>
      <h2 className="fw-bold" style={{ color: "#FF0033" }}>
        {stats.totalBookings}
      </h2>
    </div>
  </div>

  <div className="col-md-3">
    <div
      className="p-4"
      style={{
        borderRadius: "18px",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.75)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1), inset 0px 0px 15px rgba(255,255,255,0.5)"
      }}
    >
      <h5 className="text-muted">Total Revenue</h5>
      <h2 className="fw-bold" style={{ color: "#28A745" }}>
        ₹{Number(stats.totalRevenue || 0).toLocaleString()}
      </h2>
    </div>
  </div>

</div>


  {/* Quick Links */}
  <hr className="my-5" />
  <h4 className="fw-bold mb-3">Quick Links</h4>

  <div className="d-flex gap-3 flex-wrap">
    <a href="/admin/bookings" className="btn btn-primary px-4 py-2 rounded-pill">Manage Bookings</a>
    <a href="/admin/customers" className="btn btn-secondary px-4 py-2 rounded-pill">Manage Customers</a>
    <a href="/admin/equipment" className="btn btn-success px-4 py-2 rounded-pill">Manage Equipment</a>
    <a href="/admin/invoices" className="btn btn-warning px-4 py-2 rounded-pill">View Invoices</a>
    <a href="/admin/payments" className="btn btn-danger px-4 py-2 rounded-pill">View Payments</a>
  </div>

</div>

  );
}
