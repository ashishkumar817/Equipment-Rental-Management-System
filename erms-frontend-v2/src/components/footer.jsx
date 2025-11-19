// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>MACHINEX Equipment Rentals</h5>
            <p className="small text-muted">Reliable heavy equipment hire across UAE. Contact us for fleet & long-term options.</p>
            <div className="small">Phone: +91 9108291462</div>
            <div className="small">Email: info@machinexrentals.com</div>
          </div>

          <div className="col-md-2 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a className="text-decoration-none text-light" href="/equipment">Equipment</a></li>
              <li><a className="text-decoration-none text-light" href="/about">About</a></li>
              <li><a className="text-decoration-none text-light" href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-3 mb-3">
            <h6>Services</h6>
            <ul className="list-unstyled small">
              <li>Equipment Rental</li>
              <li>Transport & Logistics</li>
              <li>On-site Operators</li>
            </ul>
          </div>

          <div className="col-md-3 mb-3">
            <h6>Office</h6>
            <div className="small">India, Karnataka, Udupi Dist</div>
            <div className="mt-2">
              <button className="btn btn-outline-light btn-sm">Get Support</button>
            </div>
          </div>
        </div>

        <hr className="border-top border-secondary" />
        <div className="text-center small">&copy; {new Date().getFullYear()} MACHINEX Equipment Rentals. All rights reserved.</div>
      </div>
          <div className="footer-love text-center">
      Made with <span> ❤ </span> by <strong> Ashish</strong>
    </div>

    </footer>
  );
}
