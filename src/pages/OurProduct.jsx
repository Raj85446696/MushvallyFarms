import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footor from "../components/Footor";
import { Plus, Minus, X, Weight } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OurProduct() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [address, setAddress] = useState({ address: "", city: "", postalCode: "", country: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/products`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
        const initialQuantities = {};
        data.forEach(product => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
        toast.error('Failed to load products', { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const increaseQty = (id) => setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decreaseQty = (id) => setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!", { position: "top-center" });
        return;
      }

      // Validate address
      if (!address.address || !address.city || !address.postalCode || !address.country) {
        toast.error("Please fill all address fields!", { position: "top-center" });
        return;
      }

      const orderData = {
        orderItems: [
          {
            name: selectedProduct.name, 
            qty: quantities[selectedProduct._id],
            image: selectedProduct.image,
            price: selectedProduct.price,
            weight:selectedProduct.weight,
            product: selectedProduct._id, 
          },
        ],
        shippingAddress: address,
        paymentMethod: "Razorpay",
        totalPrice: selectedProduct.price * quantities[selectedProduct._id],
      };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to create order');
      }

      if (data && data.order && data.order.id) {
        openRazorpayPopup(data.order);
      } else {
        toast.error(`❌ Failed to create Razorpay order: ${data.message || "Unknown error"}`, {
          position: "top-center",
        });
      }

      setShowModal(false);
    } catch (error) {
      console.error("Order Error:", error);
      toast.error(`❌ Order failed: ${error.message}`, { position: "top-center" });
    }
  };

  const openRazorpayPopup = (order) => {
    const token = localStorage.getItem("token");
    const options = {
      key: "rzp_test_RkfAaRs83PNKJl",
      amount: order.amount,
      currency: order.currency,
      name: "Organic Store",
      description: selectedProduct.name,
      image: selectedProduct.image,
      order_id: order.id,

      handler: async function (response) {
        toast.success("Payment Successful!", {
          position: "top-center",
          autoClose: 2000,
        });
        try {
          const verifyRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            toast.success("Order marked as paid!", {
              position: "top-center",
              autoClose: 3000,
            });
          } else {
            toast.error(`❌ Payment verification failed: ${verifyData.message}`, {
              position: "top-center",
            });
          }
        } catch (err) {
          console.error("Verification Error:", err);
          toast.error("❌ Error verifying payment!", { position: "top-center" });
        }
      },

      prefill: {
        name: "Ritu Raj Kumar",
        email: "rituraj@example.com",
        contact: "9999999999",
      },
      notes: { address: address.address },
      theme: { color: "#3e2f26" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="bg-[#f3ede2] min-h-screen py-12 px-4 md:px-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-[#3e2f26] text-lg">Loading products...</div>
          </div>
        </main>
        <Footor />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="bg-[#f3ede2] min-h-screen py-12 px-4 md:px-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-red-600 text-lg">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#3e2f26] text-[#f3ede2] py-2 px-4 rounded-md hover:bg-[#2b251f] transition"
            >
              Retry
            </button>
          </div>
        </main>
        <Footor />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <main className="bg-[#f3ede2] min-h-screen py-12 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-[#3e2f26] text-center">
            Our Products
          </h1>

          {products.length === 0 ? (
            <div className="text-center text-[#3e2f26] text-lg">No products available</div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all flex flex-col overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="w-full h-full object-cover hover:scale-105 transition" 
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <h2 className="text-lg font-semibold text-[#3e2f26] mb-1">{p.name}</h2>
                    <p className="text-sm text-[#5a4b3f] mb-3 leading-snug">{p.description}</p>

                    {/* Product Details Row */}
                    <div className="flex items-center justify-between mb-3">
                      {/* Weight Display */}
                      <div className="flex items-center gap-1 text-sm text-[#5a4b3f]">
                        <Weight className="w-4 h-4" />
                        <span>{p.weight || 'N/A'} gm</span>
                      </div>
                      
                      {/* Category */}
                      <span className="bg-[#e5d5b3] text-[#3e2f26] px-2 py-1 text-xs rounded-full">
                        {p.category}
                      </span>
                    </div>

                    {/* Stock Status */}
                    {p.stock !== undefined && (
                      <div className="mb-3">
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                          p.stock === 0 
                            ? 'text-red-800 bg-red-100' 
                            : p.stock < 10 
                            ? 'text-orange-800 bg-orange-100'
                            : 'text-green-800 bg-green-100'
                        }`}>
                          {p.stock === 0 ? 'Out of Stock' : p.stock < 10 ? 'Low Stock' : 'In Stock'} ({p.stock} units)
                        </div>
                      </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-center mt-2 space-x-3">
                      <button 
                        onClick={() => decreaseQty(p._id)}
                        className="p-2 bg-[#e5d5b3] rounded-full hover:bg-[#d9b382] transition-colors"
                        disabled={p.stock === 0}
                      >
                        <Minus className="w-4 h-4 text-[#3e2f26]" />
                      </button>
                      <span className="font-semibold text-[#3e2f26] text-lg">
                        {quantities[p._id] || 1}
                      </span>
                      <button 
                        onClick={() => increaseQty(p._id)}
                        className="p-2 bg-[#e5d5b3] rounded-full hover:bg-[#d9b382] transition-colors"
                        disabled={p.stock === 0 || (quantities[p._id] || 1) >= (p.stock || 1)}
                      >
                        <Plus className="w-4 h-4 text-[#3e2f26]" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="bg-gradient-to-r from-[#d9b382] to-[#b7c6a0] text-[#3e2f26] font-bold px-3 py-1 text-sm rounded-full">
                        ₹{p.price}
                      </span>
                      <button
                        onClick={() => handleBuyClick(p)}
                        disabled={p.stock === 0}
                        className={`py-2 px-4 text-sm rounded-md transition ${
                          p.stock === 0
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-[#3e2f26] text-[#f3ede2] hover:bg-[#2b251f]'
                        }`}
                      >
                        {p.stock === 0 ? 'Out of Stock' : 'Buy Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-[#3e2f26] mb-4 text-center">
              Enter Delivery Address
            </h2>

            <input
              type="text"
              placeholder="Address"
              className="w-full border p-2 rounded mb-3"
              value={address.address}
              onChange={(e) => setAddress({ ...address, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border p-2 rounded mb-3"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full border p-2 rounded mb-3"
              value={address.postalCode}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full border p-2 rounded mb-4"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
            />

            <button
              onClick={handleOrder}
              className="w-full bg-[#3e2f26] text-[#f3ede2] py-2 rounded-md hover:bg-[#2b251f] transition"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      )}

      <Footor />
    </>
  );
}

export default OurProduct;