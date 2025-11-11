import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideNavbar';
import SubNavbar from '../components/SubNavbar';

function ListOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API call
  useEffect(() => {
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
      {
        _id: '3',
        user: {
          name: 'Mike Johnson',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        },
        products: [
          { name: 'Stainless Steel Bottle', quantity: 1, price: 24.99 },
          { name: 'Fitness Watch', quantity: 1, price: 199.99 }
        ],
        totalAmount: 224.98,
        createdAt: '2024-01-18T09:15:00Z',
        deliveredStatus: 'pending',
        paymentStatus: 'pending',
        shippingAddress: '789 Pine Rd, Chicago, IL'
      },
      {
        _id: '4',
        user: {
          name: 'Emily Brown',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
        },
        products: [
          { name: 'Programming Book', quantity: 1, price: 49.99 },
          { name: 'Laptop Stand', quantity: 1, price: 39.99 }
        ],
        totalAmount: 89.98,
        createdAt: '2024-01-17T16:45:00Z',
        deliveredStatus: 'cancelled',
        paymentStatus: 'refunded',
        shippingAddress: '321 Elm St, Miami, FL'
      },
      {
        _id: '5',
        user: {
          name: 'David Chen',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
        },
        products: [
          { name: 'Smartphone', quantity: 1, price: 699.99 },
          { name: 'Screen Protector', quantity: 1, price: 14.99 }
        ],
        totalAmount: 714.98,
        createdAt: '2024-01-16T11:30:00Z',
        deliveredStatus: 'delivered',
        paymentStatus: 'paid',
        shippingAddress: '654 Maple Dr, Seattle, WA'
      }
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.deliveredStatus === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order._id === orderId ? { ...order, deliveredStatus: newStatus } : order
    ));
  };

  if (loading) {
    return (
      <>
        <SubNavbar />
        <div className="flex h-screen bg-[#F8F4F0]">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto"></div>
              <p className="mt-4 text-[#6F5B41]">Loading orders...</p>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SubNavbar />
      <div className="flex h-screen bg-[#F8F4F0]">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#6F5B41] mb-2">Order Management</h1>
              <p className="text-[#8B7355]">View and manage all customer orders</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                {/* Status Filter */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === 'all' 
                        ? 'bg-[#8B7355] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Orders
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setFilterStatus('shipped')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === 'shipped' 
                        ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Shipped
                  </button>
                  <button
                    onClick={() => setFilterStatus('delivered')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === 'delivered' 
                        ? 'bg-green-100 text-green-800 border border-green-300' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Delivered
                  </button>
                </div>

                {/* Search and Export */}
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="w-full lg:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-colors"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 font-semibold text-gray-700">
                <div className="col-span-3">Customer & Order</div>
                <div className="col-span-2 text-center">Products</div>
                <div className="col-span-1 text-center">Amount</div>
                <div className="col-span-2 text-center">Order Date</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>

              {/* Orders List */}
              <div className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    No orders found matching your criteria.
                  </div>
                ) : (
                  filteredOrders.map(order => (
                    <div key={order._id} className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors">
                      {/* Customer Info */}
                      <div className="col-span-3 flex items-center gap-4">
                        <img 
                          src={order.user.image} 
                          alt={order.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{order.user.name}</h3>
                          <p className="text-sm text-gray-500">Order #{order._id}</p>
                          <p className="text-xs text-gray-400 truncate max-w-xs">{order.shippingAddress}</p>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm text-gray-800 font-medium">
                            {order.products.length} item{order.products.length > 1 ? 's' : ''}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.products[0].name}
                            {order.products.length > 1 && ` +${order.products.length - 1} more`}
                          </p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="col-span-1 flex items-center justify-center">
                        <span className="font-semibold text-gray-800">${order.totalAmount}</span>
                      </div>

                      {/* Order Date */}
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">
                            {formatDate(order.createdAt)}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="text-center space-y-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.deliveredStatus)}`}>
                            {order.deliveredStatus.charAt(0).toUpperCase() + order.deliveredStatus.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(order.paymentStatus)} block`}>
                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex items-center justify-center gap-2">
                        <button
                          onClick={() => console.log('View order:', order._id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        
                        <select
                          value={order.deliveredStatus}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355]"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {filteredOrders.length} of {orders.length} orders
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Next
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