import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom'

function SideNavbar() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [adminData, setAdminData] = useState({
        name: 'Admin User',
        email: 'admin@example.com'
    });
    const location = useLocation();

    // Fetch admin data from localStorage or API
    useEffect(() => {
        const fetchAdminData = () => {
            try {
                // Try to get admin data from localStorage (set during login)
                const userData = localStorage.getItem('user');
                const token = localStorage.getItem('token');
                
                if (userData) {
                    const user = JSON.parse(userData);
                    setAdminData({
                        name: user.name || 'Admin User',
                        email: user.email || 'admin@example.com'
                    });
                } else if (token) {
                    // If token exists but no user data, fetch from API
                    fetchAdminProfile();
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        const fetchAdminProfile = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const adminProfile = await response.json();
                    setAdminData({
                        name: adminProfile.name || 'Admin User',
                        email: adminProfile.email || 'admin@example.com'
                    });
                    // Store in localStorage for future use
                    localStorage.setItem('user', JSON.stringify(adminProfile));
                }
            } catch (error) {
                console.error('Error fetching admin profile:', error);
            }
        };

        fetchAdminData();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Close sidebar when clicking on overlay
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // Check if current path matches for active styling
    const isActivePath = (path) => {
        return location.pathname === path;
    };

    // Get initials from admin name
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden bg-[#8B7355] p-4 fixed top-0 left-0 right-0 z-30">
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
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#8B7355] to-[#6F5B41] text-white transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:h-screen flex flex-col ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-[#A88C6D] flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white cursor-pointer" onClick={()=>navigate('/admin')}>Admin Panel</h2>
                        <button
                            onClick={closeSidebar}
                            className="lg:hidden text-[#F5E6D3] hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation Items - Scrollable area */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {/* Product Button */}
                    <Link
                        to="/admin/products"
                        className={`flex items-center p-3 rounded-lg hover:bg-[#A88C6D] transition-colors group ${
                            isActivePath('/admin/products') ? 'bg-[#A88C6D]' : ''
                        }`}
                        onClick={closeSidebar}
                    >
                        <svg className="w-5 h-5 mr-3 group-hover:text-white text-[#F5E6D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-white">Products</span>
                    </Link>

                    {/* Orders Button */}
                    <Link
                        to="/admin/orders"
                        className={`flex items-center p-3 rounded-lg hover:bg-[#A88C6D] transition-colors group ${
                            isActivePath('/admin/orders') ? 'bg-[#A88C6D]' : ''
                        }`}
                        onClick={closeSidebar}
                    >
                        <svg className="w-5 h-5 mr-3 group-hover:text-white text-[#F5E6D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="text-white">Orders</span>
                    </Link>
                </nav>

                {/* Sidebar Footer - Fixed at bottom */}
                <div className="flex-shrink-0 border-t border-[#A88C6D] p-4 bg-[#6F5B41]">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-[#A88C6D] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white font-semibold text-sm">
                                {getInitials(adminData.name)}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                                {adminData.name}
                            </p>
                            <p className="text-[#F5E6D3] text-xs truncate">
                                {adminData.email}
                            </p>
                        </div>
                    </div>
                    
                    {/* Logout Button */}
                    <button
                        onClick={() => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        }}
                        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-[#A88C6D] transition-colors text-[#F5E6D3] hover:text-white text-sm border border-[#A88C6D] hover:border-transparent"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>

            {/* Add padding for mobile header */}
            <div className="lg:hidden h-16"></div>
        </>
    )
}

export default SideNavbar