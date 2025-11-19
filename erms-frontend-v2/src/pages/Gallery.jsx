// src/pages/Gallery.jsx
import React from "react";

export default function Gallery() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">Gallery</h2>

        <div className="row g-3">
          {["gallery1.jpg", "gallery2.jpg", "gallery3.jpg", "gallery4.jpg", "gallery5.jpg", "gallery6.jpg"]
            .map((img, index) => (
              <div key={index} className="col-sm-4">
                <img src={`/${img}`} className="img-fluid rounded shadow-sm" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
