import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideNavbar';
import SubNavbar from '../components/SubNavbar';
import { toast } from 'react-toastify';

function ListOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        // Get token from localStorage
        const token = localStorage.getItem('token');

        // If no token, redirect to login
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add authorization header
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const ordersData = await response.json();

        // Transform API data to match your frontend structure
        const transformedOrders = ordersData.map(order => ({
          _id: order._id,
          user: {
            name: order.user?.name || 'Customer',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          },
          products: order.orderItems?.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })) || [],
          totalAmount: order.totalPrice,
          createdAt: order.createdAt,
          deliveredStatus: order.isDelivered ? 'delivered' : 'pending',
          paymentStatus: order.isPaid ? 'paid' : 'pending',
          shippingAddress: order.shippingAddress ?
            `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`
            : 'Address not available',
          paymentMethod: order.paymentMethod,
          razorpayOrderId: order.razorpayOrderId,
          paidAt: order.paidAt
        }));

        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);

        // Fallback mock data
        const mockOrders = [
          {
            _id: '1',
            user: {
              name: 'John Doe',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
            },
            products: [
              { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
              { name: 'Phone Case', quantity: 2, price: 19.99 }
            ],
            totalAmount: 139.97,
            createdAt: '2024-01-20T10:30:00Z',
            deliveredStatus: 'delivered',
            paymentStatus: 'paid',
            shippingAddress: '123 Main St, New York, NY'
          },
          {
            _id: '2',
            user: {
              name: 'Sarah Wilson',
              image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
            },
            products: [
              { name: 'Organic Cotton T-Shirt', quantity: 3, price: 29.99 }
            ],
            totalAmount: 89.97,
            createdAt: '2024-01-19T14:20:00Z',
            deliveredStatus: 'shipped',
            paymentStatus: 'paid',
            shippingAddress: '456 Oak Ave, Los Angeles, CA'
          },
        ];

        setOrders(mockOrders);
        toast.error('Failed to load orders. Using demo data.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.deliveredStatus === filterStatus;
    const matchesSearch = order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'refunded': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return '🎁';
      case 'shipped': return '🚚';
      case 'pending': return '⏳';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Authentication required');
        window.location.href = '/login';
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/orders/${orderId}/deliver`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            status: newStatus 
          }),
          credentials: 'include',
        }
      );

      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state only after successful API call
      setOrders(prev => prev.map(order =>
        order._id === orderId ? {
          ...order,
          deliveredStatus: newStatus,
          // If marking as delivered, you might want to update other fields
          ...(newStatus === 'delivered' && {
            paymentStatus: 'paid', // Assuming delivered orders are paid
          })
        } : order
      ));

      toast.success(`Order status updated to ${newStatus}`);

    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <>
        <SubNavbar />
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading orders...</p>
              <p className="text-gray-400 text-sm mt-1">Please wait a moment</p>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SubNavbar />
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                Order Management
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Manage and track all customer orders in one place
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📦</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">
                      {orders.filter(o => o.deliveredStatus === 'pending').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <span className="text-amber-600 text-lg">⏳</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Shipped</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {orders.filter(o => o.deliveredStatus === 'shipped').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">🚚</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Delivered</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {orders.filter(o => o.deliveredStatus === 'delivered').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600 text-lg">🎁</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                {/* Status Filter */}
                {/* Status Filter - Updated to only show available options */}
                <div className="flex gap-2 flex-wrap">
                  {['all', 'pending', 'delivered'].map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${filterStatus === status
                          ? status === 'all'
                            ? 'bg-[#8B7355] text-white shadow-md'
                            : `text-${status === 'pending' ? 'amber' : 'emerald'
                            }-700 bg-${status === 'pending' ? 'amber' : 'emerald'
                            }-100 border border-${status === 'pending' ? 'amber' : 'emerald'
                            }-300`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                        }`}
                    >
                      {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full lg:w-64">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all duration-200 bg-gray-50"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Desktop Table Header - Hidden on mobile */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 md:p-6 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                <div className="md:col-span-4">Customer & Order</div>
                <div className="md:col-span-2 text-center">Products</div>
                <div className="md:col-span-1 text-center">Amount</div>
                <div className="md:col-span-2 text-center">Order Date</div>
                <div className="md:col-span-2 text-center">Status</div>
                <div className="md:col-span-1 text-center">Actions</div>
              </div>

              {/* Orders List */}
              <div className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📭</span>
                    </div>
                    <p className="text-lg font-medium text-gray-900 mb-2">No orders found</p>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredOrders.map(order => (
                    <div key={order._id} className="p-4 md:p-6 hover:bg-gray-50 transition-all duration-200">
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <img
                              src={order.user.image}
                              alt={order.user.name}
                              className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-800 truncate">{order.user.name}</h3>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  #{order._id.slice(-6)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{order.shippingAddress}</p>

                              <div className="flex items-center gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-700">Amount:</span>
                                  <div className="text-gray-900 font-semibold">₹{order.totalAmount}</div>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">Items:</span>
                                  <div className="text-gray-900">{order.products.length}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.deliveredStatus)}`}>
                              <span>{getStatusIcon(order.deliveredStatus)}</span>
                              {order.deliveredStatus}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getPaymentColor(order.paymentStatus)}`}>
                              💳 {order.paymentStatus}
                            </span>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                              <div className="text-sm text-gray-600">{formatDate(order.createdAt)}</div>
                              <div className="text-xs text-gray-400">{formatTime(order.createdAt)}</div>
                            </div>
                            <select
                              value={order.deliveredStatus}
                              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                              className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355] bg-white hover:bg-gray-50 transition-colors"
                            >
                              <option value="pending">Pending</option>
                              <option value="delivered">Delivered</option>
                              {/* Remove other options if your API only supports these two */}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                        {/* Customer Info */}
                        <div className="md:col-span-4 flex items-center gap-4">
                          <img
                            src={order.user.image}
                            alt={order.user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-800 truncate">{order.user.name}</h3>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                #{order._id.slice(-6)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{order.shippingAddress}</p>
                          </div>
                        </div>

                        {/* Products */}
                        <div className="md:col-span-2 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-sm text-gray-800 font-medium">
                              {order.products.length} item{order.products.length > 1 ? 's' : ''}
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-[120px]">
                              {order.products[0]?.name}
                              {order.products.length > 1 && ` +${order.products.length - 1} more`}
                            </p>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="md:col-span-1 flex items-center justify-center">
                          <span className="font-semibold text-gray-800 text-lg">₹{order.totalAmount}</span>
                        </div>

                        {/* Order Date */}
                        <div className="md:col-span-2 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 font-medium">
                              {formatDate(order.createdAt)}
                            </div>
                            <div className="text-xs text-gray-400">
                              {formatTime(order.createdAt)}
                            </div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="md:col-span-2 flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.deliveredStatus)}`}>
                              <span className="text-xs">{getStatusIcon(order.deliveredStatus)}</span>
                              {order.deliveredStatus.charAt(0).toUpperCase() + order.deliveredStatus.slice(1)}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getPaymentColor(order.paymentStatus)} block`}>
                              <span className="text-xs">💳</span>
                              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-1 flex items-center justify-center gap-2">
                          <select
                            value={order.deliveredStatus}
                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                            className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355] bg-white hover:bg-gray-50 transition-colors"
                          >
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                            {/* Remove other options if your API only supports these two */}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-700">{filteredOrders.length}</span> of{' '}
                  <span className="font-semibold text-gray-700">{orders.length}</span> orders
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors font-medium text-gray-700">
                    ← Previous
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors font-medium text-gray-700">
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ListOrder;