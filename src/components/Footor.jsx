import React from "react";
import { useNavigate } from "react-router-dom";

function Footor() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="bg-[#3e2f26] text-[#f3ede2] py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">

          {/* About */}
          <div className="md:w-1/3 text-center md:text-left">
            <h3 className="font-bold text-xl mb-5">Mushvalley Farms</h3>
            <p className="text-[#b7c6a0] mb-4 text-sm leading-relaxed">
              Merging nature and innovation to bring you the finest
              mushroom-based products sustainably crafted since 2025.
            </p>
            <p className="text-xs text-[#d9b382]">
              © 2025 Mushvalley Farms. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/3 text-left md:text-left">
            <h4 className="font-semibold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li
                className="hover:text-[#d9b382] cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="hover:text-[#d9b382] cursor-pointer"
                onClick={() => navigate("/aboutus")}
              >
                About Us
              </li>
              <li
                className="hover:text-[#d9b382] cursor-pointer"
                onClick={() => navigate("/ourblog")}
              >
                Blog
              </li>
              <li
                className="hover:text-[#d9b382] cursor-pointer"
                onClick={() => navigate("/ourproduct")}
              >
                Our Products
              </li>
              <li
                className="hover:text-[#d9b382] cursor-pointer"
                onClick={() => console.log("Contact")}
              >
                Contact
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:w-1/3 text-center md:text-left">
            <h4 className="font-semibold text-lg mb-5">Newsletter</h4>
            <p className="text-[#b7c6a0] mb-4 text-sm">
              Subscribe to get the latest updates and offers.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 items-center sm:items-stretch">
              <input
                type="email"
                placeholder="Your email"
                className="rounded w-full px-4 py-2 text-[#3e2f26] text-sm outline-none focus:ring-2 focus:ring-[#d9b382]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#d9b382] text-[#3e2f26] font-semibold px-6 py-2 rounded hover:bg-[#b7c6a0] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footor;
