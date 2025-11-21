import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footor from "../components/Footor";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Package, Calendar, MapPin, CreditCard, Truck, Scale, Tag, Box } from "lucide-react";

function MyOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // ✅ Load user safely from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser._id) {
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Invalid user data in localStorage:", err);
      setUser(null);
    }
  }, []);

  // ✅ Fetch orders after user is loaded
  useEffect(() => {
    if (user === null) return; // wait till user loads

    if (!user?._id) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // ✅ Correct API call with token
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/order/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // ✅ Handle loading user
  if (user === null)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f8f4ec] to-[#f1e9db]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfa86e] mx-auto mb-4"></div>
          <p className="text-lg text-[#5a4638]">Loading user data...</p>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f8f4ec] to-[#f1e9db] py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2d231b] mb-4">
              My Orders
            </h1>
            <p className="text-lg text-[#5a4638] max-w-2xl mx-auto">
              Track and manage all your orders in one place
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#cfa86e] mb-6"></div>
              <p className="text-xl text-[#5a4638] animate-pulse">Loading your orders...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center border border-[#e8dfd0]">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">Something went wrong</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 font-semibold"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No Orders State */}
          {!loading && !error && orders.length === 0 && (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-[#e8dfd0]">
              <div className="text-6xl mb-6">🛍️</div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#2d231b] mb-4">
                No Orders Yet
              </h3>
              <p className="text-lg text-[#5a4638] mb-8 max-w-md mx-auto">
                You haven't placed any orders yet. Start exploring our fresh collection!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/ourproduct")}
                  className="bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center"
                >
                  <span>Browse Products</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="border-2 border-[#cfa86e] text-[#5a4638] px-8 py-4 rounded-xl font-semibold hover:bg-[#f8f3ea] transition-all duration-300"
                >
                  Go Home
                </button>
              </div>
            </div>
          )}

          {/* Orders List */}
          {!loading && !error && orders.length > 0 && (
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-lg text-[#5a4638]">
                  Showing <span className="font-semibold text-[#2d231b]">{orders.length}</span> order{orders.length !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#5a4638]">Sort by:</span>
                  <select className="bg-white border border-[#e8dfd0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cfa86e] shadow-sm">
                    <option>Most Recent</option>
                    <option>Oldest First</option>
                    <option>Highest Price</option>
                    <option>Lowest Price</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {orders.map((order, index) => (
                  <div
                    key={order._id || index}
                    className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#e8dfd0] overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-[#fefbf6] to-[#fbf7f0] p-6 border-b border-[#e8dfd0]">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Package className="w-6 h-6 text-[#cfa86e]" />
                            <h3 className="text-xl font-bold text-[#2d231b]">
                              Order #{order._id?.slice(-8).toUpperCase()}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#5a4638]">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${order.isDelivered
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                            <Truck className="w-4 h-4" />
                            {order.isDelivered ? 'Delivered' : 'Processing'}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${order.isPaid
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                            <CreditCard className="w-4 h-4" />
                            {order.isPaid ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2 text-[#5a4638]">
                          <Box className="w-4 h-4" />
                          <span className="text-sm">
                            {order.orderItems?.length || 0} item{order.orderItems?.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <span className="text-xl font-bold text-[#cfa86e]">
                          Total: ₹{order.totalPrice?.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6">
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="w-full flex justify-between items-center p-4 bg-[#faf8f3] rounded-xl hover:bg-[#f5f1e8] transition-colors duration-300 mb-4 border border-[#e8dfd0]"
                      >
                        <h4 className="font-semibold text-[#2d231b] flex items-center gap-2">
                          <Package className="w-5 h-5 text-[#cfa86e]" />
                          Order Items ({order.orderItems?.length || 0})
                        </h4>
                        <svg
                          className={`w-5 h-5 text-[#5a4638] transform transition-transform ${expandedOrder === order._id ? 'rotate-180' : ''
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {expandedOrder === order._id && (
                        <div className="space-y-4">
                          {order.orderItems?.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col md:flex-row gap-4 p-4 bg-[#faf8f3] rounded-xl border border-[#e8dfd0]"
                            >
                              {/* Product Image */}
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full md:w-24 h-24 rounded-lg object-cover border border-[#e8dfd0] flex-shrink-0"
                                />
                              )}

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                                  <div className="flex-1">
                                    <p className="font-semibold text-[#2d231b] text-lg mb-1">{item.name}</p>
                                    {item.description && (
                                      <p className="text-sm text-[#5a4638] mb-2 line-clamp-2">{item.description}</p>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <p className="text-xl font-bold text-[#cfa86e]">
                                      ₹{item.price?.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-[#5a4638]">
                                      Qty: <span className="font-semibold">{item.qty}</span>
                                    </p>
                                  </div>
                                </div>

                                {/* Additional Product Information */}
                                {/* Additional Product Information */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                                  {item.weight && (
                                    <div className="flex items-center gap-2 text-[#5a4638]">
                                      <Scale className="w-4 h-4" />
                                      <span>Weight: <strong>{item.weight} gm</strong></span>
                                    </div>
                                  )}

                                  {item.category && (
                                    <div className="flex items-center gap-2 text-[#5a4638]">
                                      <Tag className="w-4 h-4" />
                                      <span>Category: <strong>{item.category}</strong></span>
                                    </div>
                                  )}

                                  {item.product && (
                                    <div className="flex items-center gap-2 text-[#5a4638]">
                                      <Box className="w-4 h-4" />
                                      <span>Product ID: <strong className="font-mono text-xs">
                                        {typeof item.product === 'string'
                                          ? item.product.slice(-8)
                                          : item.product?._id?.slice(-8) || 'N/A'
                                        }
                                      </strong></span>
                                    </div>
                                  )}

                                  <div className="flex items-center gap-2 text-[#5a4638]">
                                    <CreditCard className="w-4 h-4" />
                                    <span>Subtotal: <strong>₹{(item.price * item.qty).toLocaleString()}</strong></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Shipping Address */}
                          {order.shippingAddress && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                              <h5 className="font-semibold text-[#2d231b] mb-3 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                Shipping Address
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#5a4638]">
                                <div>
                                  <strong>Address:</strong> {order.shippingAddress.address}
                                </div>
                                <div>
                                  <strong>City:</strong> {order.shippingAddress.city}
                                </div>
                                <div>
                                  <strong>Postal Code:</strong> {order.shippingAddress.postalCode}
                                </div>
                                <div>
                                  <strong>Country:</strong> {order.shippingAddress.country}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Order Summary */}
                          <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                            <h5 className="font-semibold text-[#2d231b] mb-3">Order Summary</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div className="text-[#5a4638]">
                                <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
                              </div>
                              {order.updatedAt && (
                                <div className="text-[#5a4638]">
                                  <strong>Last Updated:</strong> {new Date(order.updatedAt).toLocaleString()}
                                </div>
                              )}
                              <div className="text-[#5a4638]">
                                <strong>Payment Method:</strong> {order.paymentMethod || 'Razorpay'}
                              </div>
                              <div className="text-[#5a4638]">
                                <strong>Total Items:</strong> {order.orderItems?.reduce((sum, item) => sum + item.qty, 0)} units
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button (if needed) */}
              {orders.length > 6 && (
                <div className="text-center mt-12">
                  <button className="bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md">
                    Load More Orders
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footor />
    </>
  );
}

export default MyOrder;