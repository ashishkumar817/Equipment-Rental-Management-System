import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    setLoading(true);
    api.getPayments()
      .then((res) => setPayments(res.data || []))
      .catch((err) => console.error("Payments load error:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container py-4">
      <h4>Payments</h4>
      <hr />

      {loading && <p>Loading payments…</p>}

      {!loading && payments.length === 0 && (
        <p>No payments found.</p>
      )}

      {!loading && payments.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method / TXN Ref</th>
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
        </div>
      )}
    </div>
  );
}
