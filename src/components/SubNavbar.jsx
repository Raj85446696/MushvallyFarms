import React from "react";
import { useNavigate } from "react-router-dom";

function SubNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#3e2f26] text-[#f3ede2] shadow-lg transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="flex flex-col leading-tight cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-2xl font-bold text-[#d9b382]">
              Mushvalley Farms
            </span>
            <span className="text-xs text-[#b7c6a0] tracking-wide">
              Since 2025
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SubNavbar;
