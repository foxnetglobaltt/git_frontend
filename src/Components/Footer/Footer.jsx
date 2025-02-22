import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css"; // Ensure this is the correct path

const Footer = () => {
  const [hovered, setHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Track sidebar collapse
  const navigate = useNavigate();

  // Retrieve collapse state from localStorage
  useEffect(() => {
    const storedState = localStorage.getItem("isSidebarCollapsed");
    if (storedState) {
      setIsCollapsed(JSON.parse(storedState));
    }
  }, []);

  return (
    <footer
      className={`bg-gray-900 text-gray-400 p-4 font-poppins custom-footer-width ${isCollapsed ? "pl-0" : "pl-60"} w-full relative`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row justify-between main">
        {/* Left Side */}
        <div className="flex-1  mb-8 lg:mb-0 pt-4 left">
          {/* DeskAssure Logo */}
          <div
            className="mb-10 relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered ? (
              <img
                src="/4.png"
                alt="Second Logo"
                className="h-[120px] w-auto object-fill transition-all duration-300"
              />
            ) : (
              <img
                src="/3.png"
                alt="DeskAssure Logo"
                className="h-[120px] w-auto object-fill transition-all duration-300"
              />
            )}
          </div>

          {/* Description */}
          <p className="description-text mb-4 font-poppins">
            The first free end-to-end analytics service for the site, designed
            to work with enterprises of various levels and business segments.
          </p>

          {/* Social Media Icons */}
          <div className="mt-10 flex space-x-5 mb-4">
            <a href="" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" className="h-10 w-10" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <img src="/instagram.png" alt="Instagram" className="h-10 w-10" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <img
                src="/facebook-logo.png"
                alt="Facebook"
                className="h-10 w-10"
              />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <img src="/youtube.png" alt="YouTube" className="h-10 w-10" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <img src="/telegram.png" alt="Telegram" className="h-10 w-10" />
            </a>
          </div>
        </div>

        {/* Right Side - Push to the right edge of the screen */}
        <div className="flex-1 pt-4 right absolute right-36 top-0 mt-12 bottom-0"> {/* Using absolute positioning */}
          {/* Horizontal Navigation Links */}
          <div className="flex justify-center space-x-8 mb-4 font-poppins privacy w-full ml-28">
            <a
              href="#testimonials"
              className="footer-link font-poppins"
              onClick={() => navigate("/dashboard/PrivacyPolicyPage")}
            >
              Privacy Policy
            </a>
            <a
              href="#pricing"
              className="footer-link font-poppins"
              onClick={() => navigate("/dashboard/TermsOfService")}
            >
              Terms of Service
            </a>
            <a
              href="#contacts"
              className="footer-link font-poppins"
              onClick={() => navigate("/dashboard/security-policy")}
            >
              Security Policy
            </a>
          </div>

          {/* Contact and Location Information */}
          <div className="mt-6 ml-[33%] flex flex-col mb-4 font-poppins">
            <h4 className="contact-title mb-3 text-white">
              <strong className="font-poppins">Contact Us</strong>
            </h4>
            <p className="font-poppins">+91 90948 94948</p>
            <p className="font-poppins">care@deskassure.com</p>

            <div className="mt-8">
              <h4 className="contact-title mb-3 text-white">
                <strong className="font-poppins">Location</strong>
              </h4>
              <div className="flex space-x-8">
                <p className="font-poppins">New Delhi</p>
                <p className="font-poppins">Bangalore</p>
                <p className="font-poppins">Pune</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
