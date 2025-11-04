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
          // http://localhost:8000/user/order/${user._id}
          `https://mushvallyfarmsbackend.onrender.com/user/order/${user._id}`,
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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading user data...</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] bg-[#f3ede2] py-10 px-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#3e2f26] mb-8">My Orders</h1>

        {/* Loading */}
        {loading && (
          <p className="text-gray-600 text-lg animate-pulse">Loading orders...</p>
        )}

        {/* Error */}
        {error && <p className="text-red-600 font-semibold">{error}</p>}

        {/* No Orders */}
        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-lg text-gray-600 mb-4">
              You haven’t placed any orders yet 🛍️
            </p>
            <button
              onClick={() => navigate("/ourproduct")}
              className="bg-[#3e2f26] text-[#f3ede2] px-6 py-3 rounded-full font-semibold hover:bg-[#5a4034] transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 border border-[#d9b382] hover:shadow-lg transition-all duration-300"
              >
                {/* Order Info */}
                <div>
                  <h2 className="text-xl font-semibold text-[#3e2f26] mb-2">
                    Order #{order._id?.slice(-6).toUpperCase()}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        order.isDelivered ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment:{" "}
                    <span
                      className={`font-semibold ${
                        order.isPaid ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {order.isPaid ? "Paid ✅" : "Not Paid ❌"}
                    </span>
                  </p>
                </div>

                {/* Order Items */}
                <div className="flex flex-col gap-2">
                  {order.orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 border-t border-gray-200 pt-2"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-[#3e2f26]">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.qty} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Price */}
                <div className="mt-3 border-t pt-2 text-right">
                  <p className="text-[#d9b382] font-semibold">
                    Total: ₹{order.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footor />
    </>
  );
}

export default MyOrder;
