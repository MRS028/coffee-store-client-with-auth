import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-gray-800 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h2 className="footer-title text-lg font-bold mb-4">About Us</h2>
          <p className="text-gray-400">
            We are dedicated to providing the best services to our clients. 
            Join us to build something amazing together.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="footer-title text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#services" className="link link-hover text-gray-400 hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="link link-hover text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="link link-hover text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="#faq" className="link link-hover text-gray-400 hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="footer-title text-lg font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700 text-2xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-500">
        &copy; {new Date().getFullYear()} MyProject. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
