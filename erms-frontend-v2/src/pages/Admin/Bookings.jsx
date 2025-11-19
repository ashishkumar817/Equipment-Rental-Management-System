// src/pages/Admin/Bookings.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await api.getBookings();
      setBookings(res.data || []);
    } catch (err) {
      console.error("Bookings load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (b) => {
    if (b?.invoice?.total) return b.invoice.total;
    if (b?.computedTotal) return b.computedTotal;
    return "—";
  };

  const changeStatus = async (id, status) => {
    try {
      let resp;
      if (status === "COMPLETED") resp = await api.completeBooking(id);
      else if (status === "CANCELLED") resp = await api.cancelBooking(id);
      else return;

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? resp.data : b))
      );
      alert("Booking updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Bookings</h4>
        <Link className="btn btn-primary" to="/admin/bookings/new">
          + New Booking
        </Link>
      </div>

      {loading ? (
        <div>Loading bookings…</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Equipment</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Amount</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.customer?.name || "—"}</td>
                  <td>{b.equipment?.name || "—"}</td>
                  <td>{b.startDate}</td>
                  <td>{b.endDate}</td>

                  <td>
                    <span
                      className={`badge ${
                        b.status === "COMPLETED"
                          ? "bg-success"
                          : b.status === "CANCELLED"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td>₹{formatAmount(b)}</td>

                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => setActive(b)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-sm btn-outline-success me-1"
                      onClick={() => changeStatus(b.id, "COMPLETED")}
                    >
                      Done
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => changeStatus(b.id, "CANCELLED")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* =================== BOOKING DETAILS MODAL =================== */}
      {active && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          onClick={() => setActive(null)}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5>Booking #{active.id}</h5>
                <button className="btn-close" onClick={() => setActive(null)} />
              </div>

              <div className="modal-body">
                <p><strong>Customer:</strong> {active.customer?.name}</p>
                <p><strong>Equipment:</strong> {active.equipment?.name}</p>
                <p><strong>Start:</strong> {active.startDate}</p>
                <p><strong>End:</strong> {active.endDate}</p>
                <p><strong>Status:</strong> {active.status}</p>

                <p><strong>Total Amount:</strong> ₹{formatAmount(active)}</p>

                {active.invoice && (
                  <>
                    <hr/>
                    <p><strong>Subtotal:</strong> ₹{active.invoice.subtotal}</p>
                    <p><strong>Tax:</strong> ₹{active.invoice.tax}</p>
                    <p><strong>Total:</strong> ₹{active.invoice.total}</p>
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setActive(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
