import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function SideNavbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Check if current path matches for active styling
    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden bg-[#8B7355] p-4">
                <button
                    onClick={toggleSidebar}
                    className="text-white p-2 rounded-md hover:bg-[#6F5B41] transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#8B7355] to-[#6F5B41] text-white transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:h-screen ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-[#A88C6D]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden text-[#F5E6D3] hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="p-4 space-y-2">
                    {/* Product Button */}
                    <Link
                        to="/admin/products"
                        className={`flex items-center p-3 rounded-lg hover:bg-[#A88C6D] transition-colors group ${
                            isActivePath('/admin/products') ? 'bg-[#A88C6D]' : ''
                        }`}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <svg className="w-5 h-5 mr-3 group-hover:text-white text-[#F5E6D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-white">Product</span>
                    </Link>

                    {/* Orders Button */}
                    <Link
                        to="/admin/orders"
                        className={`flex items-center p-3 rounded-lg hover:bg-[#A88C6D] transition-colors group ${
                            isActivePath('/admin/orders') ? 'bg-[#A88C6D]' : ''
                        }`}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <svg className="w-5 h-5 mr-3 group-hover:text-white text-[#F5E6D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="text-white">Orders</span>
                    </Link>
                </nav>

                {/* Sidebar Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#A88C6D]">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#A88C6D] rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">A</span>
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Admin User</p>
                            <p className="text-[#F5E6D3] text-xs">admin@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideNavbar