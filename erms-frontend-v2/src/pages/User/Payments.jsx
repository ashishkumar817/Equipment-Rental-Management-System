import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

export default function UserPayments() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!user?.customerId) return;

    api.getUserPayments(user.customerId)
      .then((res) => setPayments(res.data || []))
      .catch((err) => console.error("Payment load error:", err));
  }, [user]);

  return (
    <div className="container py-4">
      <h4>My Payments</h4>
      <hr />

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Booking</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Reference</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.booking?.id ?? "—"}</td>
                <td>₹{p.amount}</td>

                <td>
                  <span
                    className={`badge ${
                      p.status === "PAID"
                        ? "bg-success"
                        : p.status === "FAILED"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td>{p.transactionRef ?? "—"}</td>
                <td>{p.timestamp?.replace("T", " ").substring(0, 19)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
