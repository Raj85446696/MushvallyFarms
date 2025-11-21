import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideNavbar';
import SubNavbar from '../components/SubNavbar';
import { toast } from 'react-toastify';
import { Package, User, MapPin, CreditCard, Calendar, Truck, DollarSign, FileText, Eye, ChevronDown, ChevronUp } from 'lucide-react';

function ListOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

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

        // Transform API data to include all information
        const transformedOrders = ordersData.map(order => ({
          _id: order._id,
          user: {
            _id: order.user?._id,
            name: order.user?.name || 'Customer',
            email: order.user?.email || 'No email',
            image: order.user?.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          },
          orderItems: order.orderItems?.map(item => ({
            _id: item._id,
            name: item.name,
            description: item.description,
            image: item.image,
            price: item.price,
            qty: item.qty,
            weight: item.weight,
            category: item.category,
            product: item.product
          })) || [],
          shippingAddress: order.shippingAddress || {
            address: '',
            city: '',
            postalCode: '',
            country: '',
            state: ''
          },
          paymentMethod: order.paymentMethod || 'Razorpay',
          paymentResult: order.paymentResult || {},
          taxPrice: order.taxPrice || 0,
          shippingPrice: order.shippingPrice || 0,
          totalPrice: order.totalPrice || 0,
          isPaid: order.isPaid || false,
          paidAt: order.paidAt || null,
          isDelivered: order.isDelivered || false,
          deliveredAt: order.deliveredAt || null,
          razorpayOrderId: order.razorpayOrderId,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          // Additional calculated fields
          itemsCount: order.orderItems?.reduce((sum, item) => sum + item.qty, 0) || 0,
          totalWeight: order.orderItems?.reduce((sum, item) => sum + (item.weight * item.qty), 0) || 0
        }));

        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);

        // Enhanced fallback mock data with all information
        const mockOrders = [
          {
            _id: '1',
            user: {
              _id: 'user1',
              name: 'John Doe',
              email: 'john.doe@example.com',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
            },
            orderItems: [
              { 
                _id: 'item1',
                name: 'Wireless Bluetooth Headphones', 
                description: 'High-quality wireless headphones with noise cancellation',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150',
                price: 99.99,
                qty: 1,
                weight: 250,
                category: 'Electronics',
                product: 'prod1'
              },
              { 
                _id: 'item2',
                name: 'Premium Phone Case', 
                description: 'Durable protective case with premium finish',
                image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=150',
                price: 19.99,
                qty: 2,
                weight: 80,
                category: 'Accessories',
                product: 'prod2'
              }
            ],
            shippingAddress: {
              address: '123 Main Street',
              city: 'New York',
              postalCode: '10001',
              country: 'USA',
              state: 'NY'
            },
            paymentMethod: 'Razorpay',
            paymentResult: {
              id: 'pay_123456',
              status: 'captured'
            },
            taxPrice: 12.00,
            shippingPrice: 5.99,
            totalPrice: 139.97,
            isPaid: true,
            paidAt: '2024-01-20T11:30:00Z',
            isDelivered: true,
            deliveredAt: '2024-01-22T14:20:00Z',
            razorpayOrderId: 'order_123456',
            createdAt: '2024-01-20T10:30:00Z',
            updatedAt: '2024-01-22T14:20:00Z',
            itemsCount: 3,
            totalWeight: 410
          },
          {
            _id: '2',
            user: {
              _id: 'user2',
              name: 'Sarah Wilson',
              email: 'sarah.wilson@example.com',
              image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
            },
            orderItems: [
              { 
                _id: 'item3',
                name: 'Organic Cotton T-Shirt', 
                description: 'Comfortable organic cotton t-shirt in various colors',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150',
                price: 29.99,
                qty: 3,
                weight: 180,
                category: 'Clothing',
                product: 'prod3'
              }
            ],
            shippingAddress: {
              address: '456 Oak Avenue',
              city: 'Los Angeles',
              postalCode: '90210',
              country: 'USA',
              state: 'CA'
            },
            paymentMethod: 'Razorpay',
            paymentResult: {
              id: 'pay_123457',
              status: 'captured'
            },
            taxPrice: 8.10,
            shippingPrice: 4.99,
            totalPrice: 89.97,
            isPaid: true,
            paidAt: '2024-01-19T15:20:00Z',
            isDelivered: false,
            deliveredAt: null,
            razorpayOrderId: 'order_123457',
            createdAt: '2024-01-19T14:20:00Z',
            updatedAt: '2024-01-19T15:20:00Z',
            itemsCount: 3,
            totalWeight: 540
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
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'pending' && !order.isDelivered) ||
      (filterStatus === 'delivered' && order.isDelivered);
    
    const matchesSearch = order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.shippingAddress.address} ${order.shippingAddress.city}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (isDelivered) => {
    return isDelivered 
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
      : 'bg-amber-50 text-amber-700 border-amber-200';
  };

  const getPaymentColor = (isPaid) => {
    return isPaid 
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
      : 'bg-red-50 text-red-700 border-red-200';
  };

  const getStatusIcon = (isDelivered) => {
    return isDelivered ? '🎁' : '⏳';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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

      const isDelivered = newStatus === 'delivered';
      
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/orders/${orderId}/deliver`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            isDelivered: isDelivered,
            deliveredAt: isDelivered ? new Date().toISOString() : null
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

      // Update local state
      setOrders(prev => prev.map(order =>
        order._id === orderId ? {
          ...order,
          isDelivered: isDelivered,
          deliveredAt: isDelivered ? new Date().toISOString() : null,
          updatedAt: new Date().toISOString()
        } : order
      ));

      toast.success(`Order marked as ${isDelivered ? 'delivered' : 'pending'}`);

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
                Manage and track all customer orders with complete details
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
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Delivery</p>
                    <p className="text-2xl font-bold text-amber-600">
                      {orders.filter(o => !o.isDelivered).length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Paid Orders</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {orders.filter(o => o.isPaid).length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{orders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                {/* Status Filter */}
                <div className="flex gap-2 flex-wrap">
                  {['all', 'pending', 'delivered'].map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                        filterStatus === status
                          ? status === 'all'
                            ? 'bg-[#8B7355] text-white shadow-md'
                            : `${
                                status === 'pending' 
                                  ? 'bg-amber-100 text-amber-700 border border-amber-300' 
                                  : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                              }`
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
                    placeholder="Search orders, customers, emails..."
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
              {/* Orders List */}
              <div className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-900 mb-2">No orders found</p>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredOrders.map(order => (
                    <div key={order._id} className="p-4 md:p-6 hover:bg-gray-50 transition-all duration-200">
                      {/* Order Header - Always Visible */}
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <img
                            src={order.user.image}
                            alt={order.user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-800 text-lg">{order.user.name}</h3>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-mono">
                                #{order._id.slice(-8).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{order.user.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(order.createdAt)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{order.shippingAddress.city}, {order.shippingAddress.country}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <div className="flex flex-col gap-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.isDelivered)}`}>
                              <span className="text-xs">{getStatusIcon(order.isDelivered)}</span>
                              {order.isDelivered ? 'Delivered' : 'Pending'}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getPaymentColor(order.isPaid)}`}>
                              <CreditCard className="w-3 h-3" />
                              {order.isPaid ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#8B7355]">₹{order.totalPrice}</p>
                            <p className="text-sm text-gray-500">{order.itemsCount} items</p>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      <div className="border-t border-gray-200 pt-4">
                        <button
                          onClick={() => toggleOrderExpansion(order._id)}
                          className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Eye className="w-4 h-4" />
                            {expandedOrder === order._id ? 'Hide Details' : 'View Full Details'}
                          </span>
                          {expandedOrder === order._id ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          )}
                        </button>

                        {expandedOrder === order._id && (
                          <div className="mt-4 space-y-6 animate-fadeIn">
                            {/* Order Items */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Package className="w-5 h-5 text-[#8B7355]" />
                                Order Items ({order.orderItems.length})
                              </h4>
                              <div className="space-y-3">
                                {order.orderItems.map((item, idx) => (
                                  <div key={item._id || idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                    />
                                    <div className="flex-1">
                                      <p className="font-semibold text-gray-800">{item.name}</p>
                                      <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                                        <span>Qty: {item.qty}</span>
                                        <span>Price: ₹{item.price}</span>
                                        <span>Weight: {item.weight}gm</span>
                                        <span>Category: {item.category}</span>
                                        <span className="font-semibold">Subtotal: ₹{(item.price * item.qty).toFixed(2)}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Shipping & Payment Info */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Shipping Address */}
                              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <MapPin className="w-5 h-5 text-blue-600" />
                                  Shipping Address
                                </h5>
                                <div className="space-y-2 text-sm text-gray-700">
                                  <p><strong>Address:</strong> {order.shippingAddress.address}</p>
                                  <p><strong>City:</strong> {order.shippingAddress.city}</p>
                                  <p><strong>State:</strong> {order.shippingAddress.state}</p>
                                  <p><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</p>
                                  <p><strong>Country:</strong> {order.shippingAddress.country}</p>
                                </div>
                              </div>

                              {/* Payment Information */}
                              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <CreditCard className="w-5 h-5 text-green-600" />
                                  Payment Information
                                </h5>
                                <div className="space-y-2 text-sm text-gray-700">
                                  <p><strong>Method:</strong> {order.paymentMethod}</p>
                                  <p><strong>Status:</strong> 
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                      order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                      {order.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                  </p>
                                  {order.paidAt && (
                                    <p><strong>Paid At:</strong> {formatDateTime(order.paidAt)}</p>
                                  )}
                                  {order.razorpayOrderId && (
                                    <p><strong>Razorpay ID:</strong> <code className="text-xs">{order.razorpayOrderId}</code></p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-600" />
                                Order Summary
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <strong>Order Date:</strong> {formatDateTime(order.createdAt)}
                                </div>
                                <div>
                                  <strong>Last Updated:</strong> {formatDateTime(order.updatedAt)}
                                </div>
                                {order.deliveredAt && (
                                  <div>
                                    <strong>Delivered At:</strong> {formatDateTime(order.deliveredAt)}
                                  </div>
                                )}
                                <div>
                                  <strong>Total Weight:</strong> {order.totalWeight}gm
                                </div>
                                <div>
                                  <strong>Items Count:</strong> {order.itemsCount} units
                                </div>
                                <div>
                                  <strong>Shipping Price:</strong> ₹{order.shippingPrice}
                                </div>
                                <div>
                                  <strong>Tax Price:</strong> ₹{order.taxPrice}
                                </div>
                                <div>
                                  <strong>Payment Method:</strong> {order.paymentMethod}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                              <div className="text-sm text-gray-600">
                                Order ID: <code className="bg-gray-100 px-2 py-1 rounded">{order._id}</code>
                              </div>
                              <div className="flex gap-3">
                                <select
                                  value={order.isDelivered ? 'delivered' : 'pending'}
                                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] bg-white hover:bg-gray-50 transition-colors"
                                >
                                  <option value="pending">Mark as Pending</option>
                                  <option value="delivered">Mark as Delivered</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
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