import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Footor() {
  const navigate = useNavigate();

  const openTerms = () => {
    window.open("/documents/terms-and-conditions.pdf", "_blank");
  };
  // Newsletter handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast.success("Subscribed to newsletter!");
  };

  return (
    <>
      <footer className="bg-[#3e2f26] text-[#f3ede2] py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-12">
            
            {/* About Section */}
            <div className="md:w-1/3 text-center md:text-left">
              <h3 className="font-bold text-xl mb-5 text-[#f3ede2]">Mushvalley Farms</h3>
              <p className="text-[#b7c6a0] mb-6 text-sm leading-relaxed">
                Cultivating premium, organic mushrooms with earth-friendly practices
                to nourish your wellness journey naturally.
              </p>
              <div className="space-y-1">
                <p className="text-xs text-[#d9b382]">
                  © 2025 Mushvalley Farms. All rights reserved.
                </p>
                <p className="text-xs text-[#b7c6a0]">
                  Organic Certified • Sustainable Farming
                </p>
              </div>
            </div>

            {/* Quick Links & Legal Section */}
            <div className="md:w-1/3">
              <h4 className="font-semibold text-lg mb-5 text-[#f3ede2] text-center md:text-left">
                Quick Links
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Navigation Links */}
                <div>
                  <h5 className="font-medium mb-3 text-sm text-[#d9b382]">Navigation</h5>
                  <ul className="space-y-2 text-sm">
                    {[
                      { label: "Home", path: "/" },
                      { label: "About Us", path: "/aboutus" },
                      { label: "Blog", path: "/ourblog" },
                      { label: "Our Products", path: "/ourproduct" }
                    ].map((item) => (
                      <li
                        key={item.label}
                        className="hover:text-[#d9b382] cursor-pointer transition-colors duration-200 hover:translate-x-1"
                        onClick={item.action || (() => navigate(item.path))}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="md:w-1/3 text-center md:text-left">
              <h4 className="font-semibold text-lg mb-5 text-[#f3ede2]">Stay Updated</h4>
              <p className="text-[#b7c6a0] mb-6 text-sm">
                Subscribe to get the latest updates, recipes, and exclusive offers.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="rounded w-full px-4 py-3 text-[#3e2f26] text-sm outline-none focus:ring-2 focus:ring-[#d9b382] focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="sm:w-auto bg-[#d9b382] hover:bg-[#c9a372] text-[#3e2f26] font-semibold px-6 py-3 rounded transition-all duration-300 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-[#b7c6a0]">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-[#5a4a3a]">
                <h5 className="font-medium mb-4 text-sm text-[#d9b382]">Connect With Us</h5>
                <div className="flex justify-center md:justify-start space-x-5">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/mushvalleyfarms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-[#b7c6a0] hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 group-hover:text-white"
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com/mushvalleyfarms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-[#b7c6a0] hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="Facebook"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 group-hover:text-white"
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* Twitter/X */}
                  <a
                    href="https://twitter.com/mushvalleyfarms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-[#b7c6a0] hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="Twitter"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 group-hover:text-white"
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com/c/mushvalleyfarms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-[#b7c6a0] hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="YouTube"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 group-hover:text-white"
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="mt-12 pt-8 border-t border-[#5a4a3a]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-xs text-[#b7c6a0]">
                  Mushvalley Farms • 123 Farm Road • Green Valley, CA 90210
                </p>
                <p className="text-xs text-[#b7c6a0] mt-1">
                  contact : mushvalleyfarms@gmail.com • (+91) 9457279085
                </p>
              </div>
              
              <div className="text-xs text-[#b7c6a0] text-center md:text-right">
                <p className="mb-2">
                  By using our website, you agree to our{" "}
                  <button
                    className="text-[#d9b382] hover:text-white cursor-pointer underline transition-colors duration-200"
                    onClick={openTerms}
                  >
                    Terms & Conditions
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footor;