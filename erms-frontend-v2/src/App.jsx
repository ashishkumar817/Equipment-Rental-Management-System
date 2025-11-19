// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";

// Components
import NavBar from './components/NavBar';
import Footer from './components/footer';

// Public Pages
import Home from './pages/Home';
import EquipmentList from './pages/EquipmentList';
import EquipmentDetails from './pages/EquipmentDetails';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminRoute from './components/AdminRoute';
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminBookings from './pages/Admin/Bookings';
import BookingCRUD from './pages/Admin/BookingCRUD';
import BookingNew from './pages/Admin/BookingNew';
import Customers from './pages/Admin/Customers';
import CustomersNew from './pages/Admin/CustomersNew';
import ManageEquipment from './pages/Admin/ManageEquipment';
import AdminInvoices from './pages/Admin/Invoices';
import AdminPayments from './pages/Admin/Payments';

// User Pages
import UserRoute from './components/UserRoute';
import UserBookings from './pages/User/Bookings';
import UserInvoices from './pages/User/Invoices';
import UserPayments from './pages/User/Payments';

export default function App() {
  return (
    <AuthProvider>
      <NavBar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/equipment" element={<EquipmentList />} />
        <Route path="/equipment/:id" element={<EquipmentDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* USER ROUTES */}
        <Route
          path="/user/bookings"
          element={
            <UserRoute>
              <UserBookings />
            </UserRoute>
          }
        />

        <Route
          path="/user/invoices"
          element={
            <UserRoute>
              <UserInvoices />
            </UserRoute>
          }
        />

        <Route
          path="/user/payments"
          element={
            <UserRoute>
              <UserPayments />
            </UserRoute>
          }
        />


        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/bookings/new"
          element={
            <AdminRoute>
              <BookingNew />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/bookings/crud"
          element={
            <AdminRoute>
              <BookingCRUD />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <AdminRoute>
              <Customers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/customers/new"
          element={
            <AdminRoute>
              <CustomersNew />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/equipment"
          element={
            <AdminRoute>
              <ManageEquipment />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/invoices"
          element={
            <AdminRoute>
              <AdminInvoices />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <AdminRoute>
              <AdminPayments />
            </AdminRoute>
          }
        />


        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container py-4">
              <h3>Page Not Found</h3>
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />

      </Routes>

      <Footer />
    </AuthProvider>
  );
}
