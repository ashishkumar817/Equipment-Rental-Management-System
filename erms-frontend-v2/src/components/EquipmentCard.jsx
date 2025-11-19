// src/components/EquipmentCard.jsx
import React from "react";

export default function EquipmentCard({ eq, mode, onEdit, onDelete }) {
  return (
    <div
      className="p-3"
      style={{
        borderRadius: "18px",
        background: "#ffffff",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      <div style={{ borderRadius: "14px", overflow: "hidden" }}>
        <img
          src={eq.imageUrl || "/placeholder.jpg"}
          alt={eq.name}
          style={{ width: "100%", height: "160px", objectFit: "cover" }}
        />
      </div>

      <div className="mt-3">
        <h5 className="fw-bold">{eq.name}</h5>

        <span
          className="badge"
          style={{
            background: "#007bff15",
            color: "#007bff",
            fontSize: "0.75rem",
            padding: "6px 10px",
            borderRadius: "8px",
          }}
        >
          {eq.type?.toUpperCase()}
        </span>

        <p className="mt-2 mb-3" style={{ color: "green", fontWeight: "bold" }}>
          ₹{eq.dailyRate}/day
        </p>

        {/* VIEW BUTTON — USER MODE */}
        {mode === "user" && (
          <a
            href={`/equipment/${eq.id}`}
            className="btn w-100"
            style={{
              border: "2px solid #007bff",
              color: "#007bff",
              borderRadius: "10px",
              fontWeight: "600",
            }}
          >
            View
          </a>
        )}

        {/* ADMIN MODE BUTTONS */}
        {mode === "full" && (
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary w-50"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="btn btn-danger w-50"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
