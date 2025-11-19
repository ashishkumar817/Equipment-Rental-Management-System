import React, { useEffect, useState } from 'react';
import api from "../../api/api";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.getInvoices()
      .then(res => setInvoices(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const markPaid = async (id) => {
    try {
      const resp = await api.updateInvoice(id);  // CORRECT
      setInvoices(prev => prev.map(i => i.id === id ? resp.data : i));
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <div className="container py-4">
      <h4>Invoices</h4>
      {loading && <div>Loading invoices…</div>}

      {!loading && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking</th>
                <th>Total</th>
                <th>Status</th>
                <th>Paid</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => (
                <tr key={idx}>
                  <td>{inv.id}</td>
                  <td>{inv.booking?.id ?? '-'}</td>
                  <td>₹{inv.total}</td>
                  <td>{inv.status}</td>
                  <td>{inv.paid ? "YES" : "NO"}</td>

                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => setActive(inv)}
                    >
                      View
                    </button>

                    {!inv.paid && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => markPaid(inv.id)}
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {active && (
        <div className="modal show d-block" tabIndex="-1" onClick={() => setActive(null)}>
          <div className="modal-dialog modal-md" onClick={e => e.stopPropagation()}>
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Invoice #{active.id}</h5>
                <button className="btn-close" onClick={() => setActive(null)} />
              </div>

              <div className="modal-body">
                <p><strong>Booking:</strong> #{active.booking?.id ?? '-'}</p>
                <p><strong>Subtotal:</strong> ₹{active.subtotal}</p>
                <p><strong>Tax:</strong> ₹{active.tax}</p>
                <p><strong>Total:</strong> ₹{active.total}</p>
                <p><strong>Status:</strong> {active.status}</p>
                <p><strong>Paid:</strong> {active.paid ? "YES" : "NO"}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setActive(null)}>Close</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
