import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

export default function UserInvoices() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (!user?.customerId) return;

    api.getUserInvoices(user.customerId)
      .then(res => setInvoices(res.data || []))
      .catch(console.error);
  }, [user]);

  return (
    <div className="container py-4">
      <h4>My Invoices</h4>
      <hr />

      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Paid?</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>₹{inv.total}</td>
                <td>{inv.status}</td>
                <td>{inv.paid ? "YES" : "NO"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
