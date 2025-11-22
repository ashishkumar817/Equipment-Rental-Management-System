// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import EquipmentCard from '../components/EquipmentCard';
import { Link } from 'react-router-dom';

export default function Home() {
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    api.getEquipmentList()
      .then(res => setEquipmentList(res.data || []))
      .catch(() => setEquipmentList([]));
  }, []);

  // Fallback sample if API empty (keeps layout)
  const sample = [
    { id: 's1', name: 'Excavator', dailyRate: 5000, imageUrl: '/excavator.jpg' },
    { id: 's2', name: 'Crane', dailyRate: 7000, imageUrl: '/crane.jpg' },
    { id: 's3', name: 'Forklift', dailyRate: 3000, imageUrl: '/forklift.jpg' },
    { id: 's4', name: 'Road Roller', dailyRate: 4000, imageUrl: '/rr.jpg' },
  ];
  const items = equipmentList.length ? equipmentList : sample;

  return (
    <div>
      {/* HERO - Bootstrap carousel */}

<section className="hero-section home-hero">

  <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">

      {/* Slide 1 */}
      <div className="carousel-item active">
        <img src="/hero-machines.jpg" className="d-block w-100 hero-slide-img" alt="Heavy equipment" />
        <div className="carousel-caption d-md-block hero-caption-left">
          <p className="lead">Rent cranes, excavators, forklifts and more — daily, weekly, monthly.</p>
          <a className="btn btn-lg btn-success me-2" href="/equipment">Browse Equipment</a>
          <a className="btn btn-outline-light btn-lg" href="/contact">Contact Us</a>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="carousel-item">
        <img src="/hero-2.jpg" className="d-block w-100 hero-slide-img" alt="Crane" />
        <div className="carousel-caption d-md-block hero-caption-left">
          
        </div>
      </div>

      {/* Slide 3 */}
      <div className="carousel-item">
        <img src="/hero-3.jpg" className="d-block w-100 hero-slide-img" alt="Work site" />
        <div className="carousel-caption d-md-block hero-caption-left">
          
        </div>
      </div>

      {/* Slide 4 */}
      <div className="carousel-item">
        <img src="/hero-4.jpg" className="d-block w-100 hero-slide-img" alt="Work site" />
        <div className="carousel-caption d-md-block hero-caption-left">
          
        </div>
      </div>

    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</section>
<div className="hero-spacer"></div>
      {/* Equipment grid */}
      <section className="featured-wrapper">
      <main className="container py-5 ">
        <h3 className="featured-title">Featured Equipment</h3>
        <div className="row g-3">
         {items.map(eq => (
        <div key={eq.id} className="col-6 col-md-4 col-lg-3">
       <EquipmentCard eq={eq} mode="view-only" />
      </div>
        ))}
      </div>

        {/* CTA / quick features */}
        <section className="mt-5">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card feature-card p-3 h-100">
                <h5>Extensive Inventory</h5>
                <p className="small text-muted">Wide range of heavy equipment ready to deploy.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card p-3 h-100">
                <h5>Skilled Operators</h5>
                <p className="small text-muted">Certified operators and on-site support available.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card p-3 h-100">
                <h5>Flexible Terms</h5>
                <p className="small text-muted">Daily, weekly and long-term rental plans.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      </section>

      {/* Stats strip */}
      <div className="stats-strip text-light py-5" style={{ backgroundImage: 'url(/bg-stats.jpg)' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3">
              <h2 className="fw-bold">3k+</h2>
              <div>Equipment Units</div>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold">10+</h2>
              <div>Years in Business</div>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold">100+</h2>
              <div>Fleet Size</div>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold">500+</h2>
              <div>Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video + text CTA */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-5 text-center">
            <div className="video-thumb position-relative" style={{maxWidth:420,margin:'0 auto'}}>
              <img src="/hero-machines.jpg" alt="video" className="img-fluid rounded shadow-sm" />
              <a className="play-btn" href="#!" onClick={(e)=>e.preventDefault()}><span>►</span></a>
            </div>
          </div>
          <div className="col-md-7">
            <h4>We offer smarter & more affordable access to rental construction equipment</h4>
            <p className="text-muted">Fast delivery, service & maintenance included. Get a quote for your project today.</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Footer will be global; App.jsx renders it */}
    </div>
  );
}
