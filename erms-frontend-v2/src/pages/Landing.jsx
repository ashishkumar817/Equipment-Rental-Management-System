import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section d-flex align-items-center">
        <div className="container text-center text-lg-start">
          <div className="row align-items-center">

            {/* TEXT */}
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="hero-title">
                Heavy Machinery Rentals for <br />
                <span className="highlight">Every Project</span>
              </h1>

              <p className="hero-subtitle">
                Rent cranes, forklifts, excavators, generators and more.
                Daily • Weekly • Monthly rental plans available.
              </p>

              <div className="mt-4">
                <Link to="/equipment" className="btn btn-primary btn-lg me-3">
                  Browse Equipment
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* IMAGE */}
            <div className="col-lg-6 hero-image-wrapper">
              <img
                src="/MachinexPoster.png"
                className="hero-image img-fluid"
                alt="Equipment"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row text-center">

            <div className="col-md-3 mb-4">
              <div className="feature-box">
                <i className="bi bi-truck fs-1 text-primary"></i>
                <h5 className="mt-3">Fast Delivery</h5>
                <p>Equipment delivered directly to your site</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="feature-box">
                <i className="bi bi-cash-stack fs-1 text-primary"></i>
                <h5 className="mt-3">Best Price</h5>
                <p>Affordable daily & monthly rental options</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="feature-box">
                <i className="bi bi-headset fs-1 text-primary"></i>
                <h5 className="mt-3">24/7 Support</h5>
                <p>Always available for assistance & repair</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="feature-box">
                <i className="bi bi-shield-check fs-1 text-primary"></i>
                <h5 className="mt-3">Certified Machines</h5>
                <p>Safe, licensed & quality-tested equipment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section text-white py-5">
        <div className="container text-center">
          <div className="row">

            <div className="col-6 col-md-3 mb-4">
              <h2>150+</h2>
              <p>Machines Available</p>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <h2>500+</h2>
              <p>Trusted Clients</p>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <h2>7</h2>
              <p>Locations</p>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <h2>30+</h2>
              <p>Certified Operators</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
