import React, { useEffect, useState } from 'react';
import api from '../api/api';
import EquipmentCard from '../components/EquipmentCard';
import EquipmentFormModal from '../components/EquipmentFormModal';
import { useAuth } from "../contexts/AuthContext";

export default function EquipmentList() {
  const { user, isAdmin } = useAuth();
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    api.getEquipmentList()
      .then(res => setEquipment(res.data))
      .catch(err => console.error('Error fetching equipment:', err));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setShowModal(true); };
  const openEdit = (eq) => { setEditing(eq); setShowModal(true); };

  const saveEquipment = async (payload, file) => {
    try {
      let finalPayload = { ...payload };

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.uploadEquipmentImage(formData);
        finalPayload.imageUrl = res.data.url;
      }

      if (editing) {
        await api.updateEquipment(editing.id, finalPayload);
      } else {
        await api.createEquipment(finalPayload);
      }

      setShowModal(false);
      load();

    } catch (err) {
      console.error(err);
      alert("Save failed.");
    }
  };

  const remove = async (id) => {
    if (window.confirm("Delete this equipment?")) {
      await api.deleteEquipment(id);
      load();
    }
  };

  const filtered = equipment.filter(eq =>
    (eq.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (eq.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Available Equipment</h2>

        {isAdmin() && (
          <button className="btn btn-primary" onClick={openAdd}>
            + Add Equipment
          </button>
        )}
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by name or category..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="row g-3">
        {filtered.map(eq => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={eq.id}>
            <EquipmentCard
              eq={eq}
              mode={isAdmin() ? "full" : "user"}
              onEdit={isAdmin() ? () => openEdit(eq) : undefined}
              onDelete={isAdmin() ? () => remove(eq.id) : undefined}
            />
          </div>
        ))}
      </div>

      {isAdmin() && (
        <EquipmentFormModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={saveEquipment}
          initial={editing || {}}
        />
      )}

    </div>
  );
}
