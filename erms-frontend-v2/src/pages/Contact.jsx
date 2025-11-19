// src/pages/Contact.jsx
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We’ve received your message.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="mb-4 text-center">Contact Us</h2>
          <p className="text-muted text-center mb-5">
            Have questions or need assistance? Send us a message and we’ll get back to you soon.
          </p>

          <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success px-4">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
