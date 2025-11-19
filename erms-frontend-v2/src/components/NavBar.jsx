import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, logout, isAdmin, isUser } = useAuth();
  const location = useLocation();

  // Detect if user is on landing page
  const isLanding = location.pathname === "/";

  return (
    <header
      className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 ${
        isLanding ? "landing-nav" : ""
      }`}
    >
      <div className="container-fluid px-4">

        {/* BRAND LEFT */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/"
          style={{ marginLeft: 0 }}
        >
          <img src="/Machinex.jpg" width="120" className="me-2" />
          <span className="text-primary">MACHINEX EQUIPMENT RENTALS</span>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV MENU */}
        <div className="collapse navbar-collapse" id="mainNav">

          <ul className={`navbar-nav ms-auto ${isLanding ? "landing-spacing" : ""}`}>
            {/* Always visible */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>

            {/* PUBLIC + USER ONLY */}
            {!isAdmin() && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/equipment">Equipment</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About Us</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/services">Services</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/gallery">Gallery</NavLink>
                </li>
              </>
            )}

            {/* USER MENU */}
            {isUser() && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/bookings">My Bookings</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/invoices">My Invoices</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/payments">My Payments</NavLink>
                </li>
              </>
            )}

            {/* ADMIN MENU */}
            {isAdmin() && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/equipment">Equipment</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/bookings">Bookings</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/customers">Customers</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/invoices">Invoices</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/payments">Payments</NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>

          {/* LOGIN / LOGOUT */}
          <div className="d-flex">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className={`btn btn-outline-primary btn-sm me-2 ${
                    isLanding ? "ms-3" : ""
                  }`}
                >
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="me-3 small text-muted">Hi, {user.name}</span>
                <button onClick={logout} className="btn btn-danger btn-sm">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
