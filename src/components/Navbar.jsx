import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
// Import your logo
import logo from "../assets/mushvalleyfarmslogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const btnRef = useRef();

  // Check login status
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.info("You've been logged out successfully 👋");
    navigate("/");
  };

  // Mobile ripple effect
  const handleMobileMenuClick = (e) => {
    setIsOpen(!isOpen);
    const button = btnRef.current;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.nativeEvent.offsetX - diameter / 2}px`;
    ripple.style.top = `${e.nativeEvent.offsetY - diameter / 2}px`;
    ripple.className = "mobile-ripple";
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  };

  return (
    <nav className="bg-[#3e2f26] text-[#f3ede2] shadow-lg transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand - Professional Version */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            {/* Logo Image with professional styling */}
            <div className="relative flex-shrink-0">
              <img
                src={logo}
                alt="Mushvalley Farms Logo"
                className="w-20 h-20 object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Brand Text with professional typography */}
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-bold text-[#d9b382] tracking-tight font-serif group-hover:text-[#e5c9a1] transition-colors duration-300">
                Mushvalley Farms
              </span>
              <span className="text-xs font-cursive text-[#b7c6a0] tracking-wider mt-0.5">
                Since <span className="italic">2025</span>
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="hover:text-[#d9b382] transition font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d9b382] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/aboutus" className="hover:text-[#d9b382] transition font-medium relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d9b382] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/ourblog" className="hover:text-[#d9b382] transition font-medium relative group">
              Our Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d9b382] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/ourproduct" className="hover:text-[#d9b382] transition font-medium relative group">
              Our Product
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d9b382] transition-all duration-300 group-hover:w-full"></span>
            </a>

            {isLoggedIn && (
              <a href="/myorder" className="hover:text-[#d9b382] transition font-medium relative group">
                My Orders
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d9b382] transition-all duration-300 group-hover:w-full"></span>
              </a>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2.5 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="bg-gradient-to-r from-[#b7c6a0] to-[#a8ba8f] text-[#3e2f26] px-6 py-2.5 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              ref={btnRef}
              onClick={handleMobileMenuClick}
              className={`focus:outline-none relative overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-90 scale-110 bg-[#4a392f]" : "rotate-0 scale-100"
              } p-2 rounded-lg`}
              style={{ width: 38, height: 38 }}
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#3e2f26] border-t border-[#4a392f] origin-top transform transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        } overflow-hidden`}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          <a href="/" className="block py-3 px-4 hover:text-[#d9b382] hover:bg-[#4a392f] rounded-lg transition-all duration-300 font-medium">
            Home
          </a>
          <a href="/aboutus" className="block py-3 px-4 hover:text-[#d9b382] hover:bg-[#4a392f] rounded-lg transition-all duration-300 font-medium">
            About Us
          </a>
          <a href="/ourblog" className="block py-3 px-4 hover:text-[#d9b382] hover:bg-[#4a392f] rounded-lg transition-all duration-300 font-medium">
            Our Blog
          </a>
          <a href="/ourproduct" className="block py-3 px-4 hover:text-[#d9b382] hover:bg-[#4a392f] rounded-lg transition-all duration-300 font-medium">
            Our Product
          </a>

          {isLoggedIn && (
            <a href="/myorder" className="block py-3 px-4 hover:text-[#d9b382] hover:bg-[#4a392f] rounded-lg transition-all duration-300 font-medium">
              My Orders
            </a>
          )}

          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-md mt-2"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </>
          ) : (
            <button
              className="w-full bg-gradient-to-r from-[#b7c6a0] to-[#a8ba8f] text-[#3e2f26] py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-md mt-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;