import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footor from "../components/Footor";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

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

  // ✅ Handle loading user
  if (user === null)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f9f6f0] to-[#f3ede2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfa86e] mx-auto mb-4"></div>
          <p className="text-lg text-[#5a4638]">Loading user data...</p>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f0] via-[#f3ede2] to-[#ece3d3] py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
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
            <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8 text-center">
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
              <div className="flex justify-between items-center mb-6">
                <p className="text-lg text-[#5a4638]">
                  Showing <span className="font-semibold text-[#2d231b]">{orders.length}</span> order{orders.length !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#5a4638]">Sort by:</span>
                  <select className="bg-white border border-[#e8dfd0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cfa86e]">
                    <option>Most Recent</option>
                    <option>Oldest First</option>
                    <option>Highest Price</option>
                    <option>Lowest Price</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {orders.map((order, index) => (
                  <div
                    key={order._id || index}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#e8dfd0] overflow-hidden group"
                  >
                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-[#f8f4ec] to-[#f3ede2] p-6 border-b border-[#e8dfd0]">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#2d231b] mb-1">
                            Order #{order._id?.slice(-8).toUpperCase()}
                          </h3>
                          <p className="text-sm text-[#5a4638]">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            order.isDelivered 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.isDelivered ? '✅ Delivered' : '🕒 Processing'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          order.isPaid 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.isPaid ? '💳 Paid' : '❌ Pending Payment'}
                        </span>
                        <span className="text-lg font-bold text-[#cfa86e]">
                          ₹{order.totalPrice?.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6">
                      <h4 className="font-semibold text-[#2d231b] mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#cfa86e]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                        Order Items ({order.orderItems?.length || 0})
                      </h4>
                      
                      <div className="space-y-4">
                        {order.orderItems?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 p-3 bg-[#f9f6f0] rounded-xl group-hover:bg-[#f3ede2] transition-colors duration-300"
                          >
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover border border-[#e8dfd0]"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#2d231b] truncate">{item.name}</p>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-[#5a4638]">
                                  Qty: <span className="font-semibold">{item.qty}</span>
                                </p>
                                <p className="text-[#cfa86e] font-semibold">
                                  ₹{item.price?.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button (if needed) */}
              {orders.length > 6 && (
                <div className="text-center mt-12">
                  <button className="bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
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