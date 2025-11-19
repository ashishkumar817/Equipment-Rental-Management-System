// src/api/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const client = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// ---------------- TOKEN ATTACH ----------------
client.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("auth_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Auth Header Helper
function authHeader() {
  const token = localStorage.getItem("auth_token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}

// Fallback if someone uses /equipment vs /equipments
async function tryFallback(primary, fallback) {
  try {
    return await primary();
  } catch {
    if (fallback) return await fallback();
    throw err;
  }
}

// ======================================================================
//                                API
// ======================================================================

const api = {
  client,

  
  // ======================================================================
  //                                AUTH
  // ======================================================================
  login: (data) => client.post("/auth/login", data),
  register: (data) => client.post("/auth/register", data),
  me: () => client.get("/auth/me"),

  // ======================================================================
  //                          USER PERSONAL DATA
  // ======================================================================
  getUserBookings(customerId) {
    return client.get(`/bookings/my/${customerId}`, authHeader());
  },

  getUserInvoices(customerId) {
    return client.get(`/invoices/my/${customerId}`, authHeader());
  },

  getUserPayments(customerId) {
    return client.get(`/payments/my/${customerId}`, authHeader());
  },

  // ======================================================================
  //                             CUSTOMERS (ADMIN)
  // ======================================================================
  getCustomers: () => client.get("/customers"),
  getCustomer: (id) => client.get(`/customers/${id}`),
  createCustomer: (data) => client.post("/customers", data),
  updateCustomer: (id, data) => client.put(`/customers/${id}`, data),
  deleteCustomer: (id) => client.delete(`/customers/${id}`),

  // ======================================================================
  //                                EQUIPMENT
  // ======================================================================
  getEquipments: () =>
    tryFallback(() => client.get("/equipment"), () => client.get("/equipments")),

  getEquipmentList: () =>
    tryFallback(() => client.get("/equipment"), () => client.get("/equipments")),

  getEquipment: (id) =>
    tryFallback(
      () => client.get(`/equipment/${id}`),
      () => client.get(`/equipments/${id}`)
    ),

  createEquipment: (data) =>
    tryFallback(
      () => client.post("/equipment", data),
      () => client.post("/equipments", data)
    ),

  updateEquipment: (id, data) =>
    tryFallback(
      () => client.put(`/equipment/${id}`, data),
      () => client.put(`/equipments/${id}`, data)
    ),

  deleteEquipment: (id) =>
    tryFallback(
      () => client.delete(`/equipment/${id}`),
      () => client.delete(`/equipments/${id}`)
    ),

  uploadEquipmentImage: (formData) =>
    client.post("/equipment/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // ======================================================================
  //                                BOOKINGS
  // ======================================================================
  getBookings: () => client.get("/bookings"),
  getBooking: (id) => client.get(`/bookings/${id}`),

  createBooking: (data) => client.post("/bookings", data),
  updateBooking: (id, data) => client.put(`/bookings/${id}`, data),
  deleteBooking: (id) => client.delete(`/bookings/${id}`),

  completeBooking: (id) => client.put(`/bookings/${id}/complete`),
  cancelBooking: (id) => client.put(`/bookings/${id}/cancel`),

  // ======================================================================
  //                                INVOICES
  // ======================================================================
  getInvoices: () => client.get("/invoices"),
  getInvoice: (id) => client.get(`/invoices/${id}`),

  updateInvoice: (id) => client.put(`/invoices/${id}/pay`),

  // ======================================================================
  //                                PAYMENTS
  // ======================================================================
  getPayments: () => client.get("/payments"),
  addPayment: (data) => client.post("/payments", data),

  getAdminStats() {
  return client.get("/admin/stats");
},

};

export default api;
