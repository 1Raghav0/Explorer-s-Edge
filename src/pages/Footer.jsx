import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About Section */}
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.jpg" alt="TripAI Logo" className="h-24 rounded-2xl" />
            </Link>
            <p className="mt-4 text-gray-400">
              Your AI-powered travel companion, ensuring stress-free trips with smart recommendations and real-time assistance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-indigo-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-indigo-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h2 className="text-xl font-semibold">Stay Connected</h2>
            <p className="mt-4 text-gray-400">
              Follow us for the latest travel trends, AI updates, and exclusive deals.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-indigo-500 text-lg">
                <i className="ri-facebook-circle-fill text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-black text-lg">
                <i className="ri-twitter-x-fill text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 text-lg">
                <i className="ri-instagram-line text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 text-lg">
                <i className="ri-linkedin-box-fill text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            “Travel smarter, explore further. Let AI guide your journey.” ✈️🌍
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TripAI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
    
  );
};

export default Footer;

