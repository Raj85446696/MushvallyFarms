import React, { useState, useEffect } from 'react';
import SideNavbar from '../components/SideNavbar';
import SubNavbar from '../components/SubNavbar';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingOrders: 0,
    totalOrders: 0,
    completedOrders: 0,
    revenue: 0,
    averageOrderValue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get token
  const getToken = () => {
    return localStorage.getItem('token') || 
           localStorage.getItem('authToken') ||
           sessionStorage.getItem('token');
  };

  // Fetch products data
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const products = await response.json();
      return products.length || 0;
    } catch (err) {
      console.error('Error fetching products:', err);
      return 0;
    }
  };

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 401) {
        throw new Error('Authentication failed. Please login again.');
      }

      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const orders = await response.json();
      console.log('Orders data:', orders); // Debug log
      
      // Calculate order statistics based on your API structure
      const pendingOrders = orders.filter(order => 
        order && !order.isDelivered
      ).length;
      
      const completedOrders = orders.filter(order => 
        order && order.isDelivered
      ).length;
      
      const totalOrders = orders.length;
      
      // Calculate revenue from delivered orders
      const revenue = orders
        .filter(order => order && order.isDelivered)
        .reduce((sum, order) => sum + (order.totalPrice || 0), 0);
      
      // Calculate average order value
      const averageOrderValue = completedOrders > 0 ? revenue / completedOrders : 0;

      // Get recent orders (last 5 orders)
      const recentOrders = orders
        .filter(order => order) // Filter out any undefined orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(order => ({
          id: order._id || order.id,
          customerName: order.user?.name || 'Customer',
          amount: order.totalPrice || 0,
          status: order.isDelivered ? 'delivered' : 
                 order.isPaid ? 'processing' : 'pending',
          date: order.createdAt,
          items: order.orderItems?.length || 0,
          paymentStatus: order.isPaid ? 'paid' : 'unpaid',
          deliveredAt: order.deliveredAt
        }));

      return { 
        pendingOrders, 
        totalOrders,
        completedOrders,
        revenue, 
        averageOrderValue,
        recentOrders,
        allOrders: orders 
      };
    } catch (err) {
      console.error('Error fetching orders:', err);
      return { 
        pendingOrders: 0, 
        totalOrders: 0,
        completedOrders: 0,
        revenue: 0, 
        averageOrderValue: 0,
        recentOrders: [],
        allOrders: [] 
      };
    }
  };

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [productsCount, ordersData] = await Promise.all([
        fetchProducts(),
        fetchOrders()
      ]);

      setStats({
        totalProducts: productsCount,
        pendingOrders: ordersData.pendingOrders,
        totalOrders: ordersData.totalOrders,
        completedOrders: ordersData.completedOrders,
        revenue: ordersData.revenue,
        averageOrderValue: ordersData.averageOrderValue
      });

      setRecentOrders(ordersData.recentOrders);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Format time
  const formatTime = (dateString) => {
    try {
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid time';
    }
  };

  // Get status badge color based on your order structure
  const getStatusColor = (status) => {
    const safeStatus = status || 'pending';
    switch (safeStatus.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format status text
  const formatStatus = (status) => {
    const safeStatus = status || 'pending';
    return safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1);
  };

  // Get payment status color
  const getPaymentStatusColor = (isPaid) => {
    return isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <>
        <SubNavbar/>
        <div className="flex h-screen bg-[#F8F4F0]">
          <SideNavbar />
          <main className="flex-1 p-6 overflow-auto flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard data...</p>
            </div>
          </main>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SubNavbar/>
        <div className="flex h-screen bg-[#F8F4F0]">
          <SideNavbar />
          <main className="flex-1 p-6 overflow-auto flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
              <button 
                onClick={fetchData}
                className="bg-[#8B7355] text-white px-4 py-2 rounded-lg hover:bg-[#6F5B41] transition-colors"
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SubNavbar/>
      <div className="flex h-screen bg-[#F8F4F0]">
        <SideNavbar />
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#8B7355] to-[#6F5B41] rounded-2xl shadow-lg p-6 mb-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-[#F5E6D3] text-lg">
              Here's what's happening with your orders and products today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Products Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#8B7355] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Products</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Live from API
                  </p>
                </div>
                <div className="p-3 bg-[#F5E6D3] rounded-xl">
                  <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pending Orders Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#E74C3C] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pending Orders</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stats.pendingOrders}</p>
                  <p className="text-sm text-orange-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Need attention
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <svg className="w-8 h-8 text-[#E74C3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#3498DB] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Orders</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {stats.completedOrders} delivered
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <svg className="w-8 h-8 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#27AE60] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Revenue</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{formatCurrency(stats.revenue)}</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Avg: {formatCurrency(stats.averageOrderValue)}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <svg className="w-8 h-8 text-[#27AE60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
              <button className="text-sm text-[#8B7355] hover:text-[#6F5B41] font-semibold" onClick={()=>navigate('/admin/orders')}>
                View All Orders
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Items</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order, index) => (
                      <tr key={order.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-800">
                          #{order.id.toString().slice(-6).toUpperCase()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {order.customerName}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          <div>{formatDate(order.date)}</div>
                          <div className="text-xs text-gray-400">{formatTime(order.date)}</div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {order.items} items
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                          {formatCurrency(order.amount)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {formatStatus(order.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus === 'paid')}`}>
                            {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-8 px-4 text-center text-gray-500">
                        No recent orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Order Status Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivered</span>
                  <span className="text-sm font-semibold text-green-600">{stats.completedOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Delivery</span>
                  <span className="text-sm font-semibold text-yellow-600">{stats.pendingOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <span className="text-sm font-semibold text-blue-600">{stats.totalOrders}</span>
                </div>
              </div>
            </div>

            {/* Revenue Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="text-sm font-semibold text-gray-800">{formatCurrency(stats.revenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Order Value</span>
                  <span className="text-sm font-semibold text-gray-800">{formatCurrency(stats.averageOrderValue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivered Orders</span>
                  <span className="text-sm font-semibold text-gray-800">{stats.completedOrders}</span>
                </div>
              </div>
            </div>

            {/* Products Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Products</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Products</span>
                  <span className="text-sm font-semibold text-gray-800">{stats.totalProducts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Products</span>
                  <span className="text-sm font-semibold text-green-600">{stats.totalProducts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Out of Stock</span>
                  <span className="text-sm font-semibold text-red-600">0</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Admin;