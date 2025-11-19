// src/components/EquipmentFormModal.jsx
import React, { useEffect, useState } from "react";

export default function EquipmentFormModal({ show, onClose, onSave, initial = {} }) {

  const [form, setForm] = useState({
    name: "",
    type: "",
    specs: "",
    dailyRate: "",
    weeklyRate: "",
    monthlyRate: "",
    imageUrl: "",
    imageFile: null,
    preview: null
  });

  useEffect(() => {
    if (show) {
      setForm({
        name: initial.name || "",
        type: initial.type || "",
        specs: initial.specs || "",
        dailyRate: initial.dailyRate || "",
        weeklyRate: initial.weeklyRate || "",
        monthlyRate: initial.monthlyRate || "",
        imageUrl: initial.imageUrl || "",
        imageFile: null,
        preview: initial.imageUrl || null,
      });
    }
  }, [show, initial]);

  const change = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Convert file → base64 preview
  const onFile = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        imageFile: file,
        preview: reader.result,
        imageUrl: reader.result // store base64 as imageUrl
      }));
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
  e.preventDefault();

  let imageUrl = form.imageUrl;

  // If file selected → upload first
  if (form.imageFile) {
    const fd = new FormData();
    fd.append("file", form.imageFile);

    const upload = await api.uploadEquipmentImage(fd);
    imageUrl = upload.data.url;   // /equipment/filename.jpg
  }

  const payload = {
    name: form.name,
    type: form.type,
    specs: form.specs,
    dailyRate: Number(form.dailyRate),
    weeklyRate: Number(form.weeklyRate),
    monthlyRate: Number(form.monthlyRate),
    imageUrl: imageUrl
  };

  onSave(payload);
};

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={submit}>

            {/* HEADER */}
            <div className="modal-header">
              <h5 className="modal-title">
                {initial.id ? "Edit Equipment" : "Add Equipment"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            {/* BODY */}
            <div className="modal-body">

              {/* PREVIEW */}
              {form.preview && (
                <div className="mb-3 text-center">
                  <img
                    src={form.preview}
                    alt="Preview"
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "180px" }}
                  />
                </div>
              )}

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Name</label>
                  <input
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={change}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Type</label>
                  <input
                    name="type"
                    className="form-control"
                    value={form.type}
                    onChange={change}
                    placeholder="Excavator, Crane..."
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label">Specs</label>
                  <textarea
                    name="specs"
                    className="form-control"
                    value={form.specs}
                    onChange={change}
                    placeholder="Engine power, capacity..."
                  />
                </div>

                {/* Rates */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Daily Rate</label>
                  <input
                    type="number"
                    name="dailyRate"
                    className="form-control"
                    value={form.dailyRate}
                    onChange={change}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Weekly Rate</label>
                  <input
                    type="number"
                    name="weeklyRate"
                    className="form-control"
                    value={form.weeklyRate}
                    onChange={change}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Monthly Rate</label>
                  <input
                    type="number"
                    name="monthlyRate"
                    className="form-control"
                    value={form.monthlyRate}
                    onChange={change}
                  />
                </div>

                {/* IMAGE URL */}
                <div className="col-md-12 mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    name="imageUrl"
                    className="form-control"
                    value={form.imageUrl}
                    onChange={(e) => {
                      change(e);
                      setForm((p) => ({ ...p, preview: e.target.value }));
                    }}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                {/* FILE UPLOAD */}
                <div className="col-md-12 mb-3">
                  <label className="form-label">Or Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={onFile}
                  />
                </div>

              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {initial.id ? "Update" : "Save"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
