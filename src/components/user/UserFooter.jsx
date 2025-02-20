import React, { useState } from "react";
import Logo from "/public/Logo_Image.png";
import { Link } from "react-router-dom";
import { Facebook, FacebookIcon, Instagram, Twitter } from "lucide-react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/user/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
        setEmail(""); // Clear input field on success
      }
    } catch (error) {
      setMessage("An error occurred while subscribing.");
    }
  };

  return (
    <footer className="bg-[#1570EF] text-white py-10 mt-20 ">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">
              <img src={Logo} alt="footer" className=""></img>
            </h1>
            <p className="">
              Find and book your perfect stay in Pakistan’s most beautiful
              destinations
            </p>
          </div>

          {/* Help Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Help</h2>
            <ul className="space-y-2 ">
              <li className="hover:opacity-80">
                <Link to="/contact">Customer Support</Link>
              </li>
              <li className="hover:opacity-80">
                <Link to="/cancellation-policy">Cancellation Options</Link>
              </li>
              <li className="hover:opacity-80">
                <Link to="safety-info">Safety Information</Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Legal</h2>
            <ul className="space-y-2 ">
              <li className="hover:opacity-80">
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li className="hover:opacity-80">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="hover:opacity-80">
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="w-full grid-flow-col space-y-4">
            <h2 className="text-lg font-semibold">Newsletter</h2>
            <p className="">Subscribe to get special offers and updates</p>
            <div className="flex items-center w-auto ">
              <form
                onSubmit={handleSubscribe}
                className="flex items-center w-auto "
              >
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email"
                  className="w-9/12 px-1 py-2 text-white bg-gray-800 rounded-l focus:outline-none"
                />
                <button className="px-1 py-2 font-medium text-blue-500 transition-colors bg-white rounded-r hover:text-opacity-95">
                  Subscribe
                </button>
              </form>
            </div>
            {message && <p>{message}</p>}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex justify-between pt-8 mt-8 text-center border-t border-white ">
          <p>© 2025 All rights reserved.</p>
          <div className="flex gap-3">
            <a href="#" target="_blank">
              <Facebook />
            </a>
            <a href="#" target="_blank">
              <Twitter />
            </a>
            <a href="#" target="_blank">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
