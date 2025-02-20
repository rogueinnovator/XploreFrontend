import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${BASE_URL}/user/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Your message has been sent successfully!");
      } else {
        setErrorMessage("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      setErrorMessage("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/contact-us.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Contact & Support</h1>
          <p className="text-lg mt-2 max-w-2xl">
            We're here 24/7 to assist you with your travel plans, bookings, and any other inquiries.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full px-4 md:px-10 lg:px-20 py-10 flex flex-col lg:flex-row gap-10">
        {/* Contact Info */}
        <div className="bg-white-100 p-6 md:p-8 rounded-lg shadow-lg w-full lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

          <div className="flex items-center mb-4">
            <MapPin className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="font-medium">123 Travel Street</p>
              <p className="text-gray-600">New York, NY 10001, United States</p>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <Phone className="text-blue-500 mr-3" size={24} />
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>

          <div className="flex items-center">
            <Mail className="text-blue-500 mr-3" size={24} />
            <p className="text-gray-600">support@explore.com</p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white-100 p-6 md:p-8 rounded-lg shadow-lg w-full lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>

          <div className="mb-4">
            <p className="font-medium">Monday - Friday</p>
            <p className="text-gray-600">9:00 AM - 6:00 PM</p>
          </div>

          <div className="mb-4">
            <p className="font-medium">Saturday</p>
            <p className="text-gray-600">10:00 AM - 4:00 PM</p>
          </div>

          <div>
            <p className="font-medium">Sunday</p>
            <p className="text-gray-600">Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full lg:w-1/3">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
                rows="4"
                required
              ></textarea>
            </div>

            {successMessage && (
              <p className="text-green-600">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
