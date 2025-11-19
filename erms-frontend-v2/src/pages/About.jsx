// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">About Us</h2>

        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/about.jpg" className="img-fluid rounded shadow" alt="About us" />
          </div>

          <div className="col-md-6">
            <p className="lead">
              We are a trusted heavy equipment rental provider.
            </p>
            <p>
              Our fleet is well-maintained, regularly serviced 
              and ready for immediate deployment. Whether your 
              project needs short-term rental or long-term 
              leasing, Machinex Equipment Rentals 
              ensures quality machinery, 
              competitive pricing and dedicated 
              customer support at every stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
