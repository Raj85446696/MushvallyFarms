import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef();

  // Ripple handler for buttery effect
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
    setTimeout(() => {
      ripple.remove();
    }, 500);
  };

  return (
    <nav className="bg-[#3e2f26] text-[#f3ede2] shadow-lg transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold text-[#d9b382]">
              Mushvalley Farms
            </span>
            <span className="ml-0 text-xs text-[#b7c6a0] tracking-wide">
              Since 2025
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="hover:text-[#d9b382] transition">Home</a>
            <a href="/aboutus" className="hover:text-[#d9b382] transition">About Us</a>
            <a href="/ourblog" className="hover:text-[#d9b382] transition">Our Blog</a>
            <a href="/ourproduct" className="hover:text-[#d9b382] transition">Our Product</a>
            <button className="bg-[#b7c6a0] text-[#3e2f26] px-4 py-2 rounded-full font-semibold hover:bg-[#a2b58a] transition" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>

          {/* Mobile Menu Button - With Ripple */}
          <div className="md:hidden flex items-center">
            <button
              ref={btnRef}
              onClick={handleMobileMenuClick}
              className={`focus:outline-none relative overflow-hidden transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"
                }`}
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

      {/* Mobile Menu with buttery effect */}
      <div
        className={`md:hidden bg-[#3e2f26] origin-top transform transition-all duration-500 ease-in-out ${isOpen
            ? "max-h-80 opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
          } overflow-hidden`}
      >
        <div className="space-y-2 px-4 pb-4 pt-2">
          <a href="/" className="block py-2 hover:text-[#d9b382] transition">
            Home
          </a>
          <a
            href="/aboutus"
            className="block py-2 hover:text-[#d9b382] transition"
          >
            About Us
          </a>
          <a
            href="/ourblog"
            className="block py-2 hover:text-[#d9b382] transition"
          >
            Our Blog
          </a>
          <a
            href="/ourproduct"
            className="block py-2 hover:text-[#d9b382] transition"
          >
            Our Product
          </a>
          <button className="w-full bg-[#b7c6a0] text-[#3e2f26] py-2 rounded-full font-semibold hover:bg-[#a2b58a] transition-all duration-300" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
