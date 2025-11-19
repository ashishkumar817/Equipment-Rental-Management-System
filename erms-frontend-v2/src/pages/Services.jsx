// src/pages/Services.jsx
import React from "react";

export default function Services() {
  return (
    <section className="py-5" style={{ background: "#f8fbff" }}>
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Our Services</h2>

        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="p-4 shadow-sm rounded bg-white h-100">
              <img src="/services1.jpg" width="350" className="mb-3" />
              <h5 className="fw-bold">Heavy Equipment Rental</h5>
              <p>Excavators, cranes, loaders, forklifts & more.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4 shadow-sm rounded bg-white h-100">
              <img src="/services2.jpg" width="350" className="mb-3" />
              <h5 className="fw-bold">Transport & Logistics</h5>
              <p>Fast and reliable delivery to your job site.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4 shadow-sm rounded bg-white h-100">
              <img src="/services3.jpg" width="350" className="mb-3" />
              <h5 className="fw-bold">On-site Operators</h5>
              <p>Certified operators for safe & skilled operation.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
