// File: src/components/Navbar.jsx
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#3e2f26] text-[#f3ede2] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold text-[#d9b382]">Mushvalley Farms</span>
            <span className="ml-0 text-xs text-[#b7c6a0] tracking-wide">Since 2025</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="hover:text-[#d9b382] transition">Home</a>
            <a href="/aboutus" className="hover:text-[#d9b382] transition">About Us</a>
            <a href="/ourblog" className="hover:text-[#d9b382] transition">Our Blog</a>
            <a href="/ourproduct" className="hover:text-[#d9b382] transition">Our Product</a>
            <button className="bg-[#b7c6a0] text-[#3e2f26] px-4 py-2 rounded-full font-semibold hover:bg-[#a2b58a] transition">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
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
      {isOpen && (
        <div className="md:hidden bg-[#3e2f26] space-y-2 px-4 pb-4">
          <a href="/" className="block py-2 hover:text-[#d9b382]">Home</a>
          <a href="/aboutus" className="block py-2 hover:text-[#d9b382]">About Us</a>
          <a href="/ourblog" className="block py-2 hover:text-[#d9b382]">Our Blog</a>
          <a href="/ourproduct" className="block py-2 hover:text-[#d9b382]">Our Product</a>
          <button className="w-full bg-[#b7c6a0] text-[#3e2f26] py-2 rounded-full font-semibold hover:bg-[#a2b58a] transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
