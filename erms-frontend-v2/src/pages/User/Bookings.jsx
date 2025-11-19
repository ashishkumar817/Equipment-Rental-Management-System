import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

export default function UserBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user?.customerId) return;

    api.client
      .get(`/bookings/my/${user.customerId}`)
      .then((res) => setBookings(res.data || []))
      .catch((err) => console.error("Booking fetch error:", err));
  }, [user]);

  return (
    <div className="container py-4">
      <h4>My Bookings</h4>
      <hr />

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipment</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.equipment?.name}</td>
                
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

                <td>₹{b.invoice?.total ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
