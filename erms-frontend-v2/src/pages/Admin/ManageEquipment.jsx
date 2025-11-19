import React, { useEffect, useState } from "react";
import api from "../../api/api";
import EquipmentFormModal from "../../components/EquipmentFormModal";

export default function ManageEquipment() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, initial: {} });
  const [message, setMessage] = useState("");

  const load = () => {
    setLoading(true);
    api
      .getEquipmentList()
      .then((r) => setItems(r.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const openAdd = () => setModal({ show: true, initial: {} });
  const openEdit = (it) => setModal({ show: true, initial: it });

  const handleSave = async (payload, file) => {
    try {
      if (modal.initial.id) {
        await api.updateEquipment(modal.initial.id, payload);

        if (file) {
          const fd = new FormData();
          fd.append("file", file);
          const up = await api.uploadEquipmentImage(fd);
          await api.updateEquipment(modal.initial.id, {
            ...payload,
            imageUrl: up.data.url,
          });
        }

        setMessage("Equipment updated.");
      } else {
        const res = await api.createEquipment(payload);

        if (file && res?.data?.id) {
          const fd = new FormData();
          fd.append("file", file);
          const up = await api.uploadEquipmentImage(fd);
          await api.updateEquipment(res.data.id, {
            ...payload,
            imageUrl: up.data.url,
          });
        }

        setMessage("Equipment created.");
      }

      setModal({ show: false, initial: {} });
      load();
    } catch (err) {
      console.error(err);
      setMessage("Save failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete equipment?")) return;

    try {
      await api.deleteEquipment(id);
      setItems((list) => list.filter((i) => i.id !== id));
      setMessage("Deleted.");
    } catch (err) {
      console.error(err);
      setMessage("Delete failed.");
    }
  };

  return (
    <div className="container py-4">
      <h4>Manage Equipment</h4>
      {message && <div className="alert alert-info">{message}</div>}

      <button className="btn btn-primary mb-3" onClick={openAdd}>
        Add Equipment
      </button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row g-3">
          {items.map((eq) => (
            <div className="col-md-3" key={eq.id}>
              <div className="card h-100">
                <img
                  src={eq.imageUrl || "/placeholder.jpg"}
                  className="card-img-top"
                  style={{ height: 140, objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{eq.name}</h5>
                  <div className="mt-2 d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => openEdit(eq)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(eq.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <EquipmentFormModal
        show={modal.show}
        onClose={() => setModal({ show: false, initial: {} })}
        onSave={handleSave}
        initial={modal.initial}
      />
    </div>
  );
}
