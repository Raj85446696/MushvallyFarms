import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footor from "../components/Footor";
import { Plus, Minus, ShoppingBag, Package, Scale, Star } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OurProduct() {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/products`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        groupProducts(data);
      } catch (err) {
        setError("Failed to load products");
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Group by name + description
  const groupProducts = (data) => {
    const grouped = {};
    const qty = {};
    const defaultVariant = {};

    data.forEach((p) => {
      const key = `${p.name}-${p.description}`;

      if (!grouped[key]) {
        grouped[key] = {
          name: p.name,
          description: p.description,
          image: p.image,
          category: p.category,
          variants: [],
        };
      }

      grouped[key].variants.push(p);
    });

    const final = Object.values(grouped);

    final.forEach((item, index) => {
      defaultVariant[index] = item.variants[0];
      qty[item.variants[0]._id] = 1;
    });

    setGroupedProducts(final);
    setSelectedVariant(defaultVariant);
    setQuantities(qty);
  };

  // 🔹 Get unique categories
  const categories = ["All", ...new Set(groupedProducts.map(p => p.category))];

  // 🔹 Filter products by category
  const filteredProducts = activeCategory === "All" 
    ? groupedProducts 
    : groupedProducts.filter(p => p.category === activeCategory);

  // 🔹 Quantity controls
  const increaseQty = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));

  const decreaseQty = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));

  // 🔹 Buy click
  const handleBuyClick = (variant) => {
    setSelectedProduct(variant);
    setShowModal(true);
  };

  // 🔹 Order
  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        return;
      }

      if (
        !address.address ||
        !address.city ||
        !address.postalCode ||
        !address.country
      ) {
        toast.error("Please fill all address fields!");
        return;
      }

      const qty = quantities[selectedProduct._id] || 1;

      const orderData = {
        orderItems: [
          {
            name: selectedProduct.name,
            qty,
            image: selectedProduct.image,
            price: selectedProduct.price,
            weight: selectedProduct.weight,
            product: selectedProduct._id,
          },
        ],
        shippingAddress: address,
        paymentMethod: "Razorpay",
        totalPrice: selectedProduct.price * qty,
      };

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      openRazorpayPopup(data.order);
      setShowModal(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // 🔹 Razorpay
  const openRazorpayPopup = (order) => {
    const token = localStorage.getItem("token");

    const options = {
      key: "rzp_test_RkfAaRs83PNKJl",
      amount: order.amount,
      currency: order.currency,
      name: "MushvalleyFarms Organic Store",
      description: selectedProduct.name,
      image: selectedProduct.image,
      order_id: order.id,

      handler: async function (response) {
        try {
          const verifyRes = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/user/verify`,
            {
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
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            toast.success("Payment successful!");
          } else {
            toast.error("Payment verification failed");
          }
        } catch {
          toast.error("Verification error");
        }
      },

      theme: { color: "#3e2f26" },
    };

    new window.Razorpay(options).open();
  };

  // 🔹 Loading skeleton
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f3ede2] py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" theme="light" />

      <main className="bg-[#f3ede2] min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2d231b] mb-4">
              Our Products
            </h1>
            <p className="text-lg text-[#5a4638] max-w-2xl mx-auto">
              Premium quality organic products for your healthy lifestyle
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-[#3e2f26] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p, index) => {
              const variant = selectedVariant[index];
              const totalPrice = (variant?.price || 0) * (quantities[variant?._id] || 1);

              return (
                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-[#3e2f26] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{p.name}</h2>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">{p.description}</p>
                    </div>

                    {/* Variant Selector */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Available Quantity:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {p.variants.map((v) => (
                          <button
                            key={v._id}
                            onClick={() => {
                              setSelectedVariant((prev) => ({
                                ...prev,
                                [index]: v,
                              }));
                              setQuantities((prev) => ({
                                ...prev,
                                [v._id]: 1,
                              }));
                            }}
                            className={`px-3 py-2 text-xs font-medium rounded-md border transition-all ${
                              variant._id === v._id
                                ? "border-[#3e2f26] bg-[#f3ede2] text-[#3e2f26]"
                                : "border-gray-300 text-gray-600 hover:border-gray-400"
                            }`}
                          >
                            {v.weight}g
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-[#3e2f26]">₹{variant.price}</span>
                        <span className="text-sm text-gray-500">/ {variant.weight}g</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Total: <span className="font-semibold">₹{totalPrice}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                          <button
                            onClick={() => decreaseQty(variant._id)}
                            className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="font-bold text-gray-800 min-w-[30px] text-center">
                            {quantities[variant._id] || 1}
                          </span>
                          <button
                            onClick={() => increaseQty(variant._id)}
                            className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleBuyClick(variant)}
                        className="flex-1 bg-[#3e2f26] text-white py-2.5 rounded-lg font-medium hover:bg-[#2e1f16] transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                      >
                        <Package className="h-4 w-4" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try selecting a different category</p>
                <button
                  onClick={() => setActiveCategory("All")}
                  className="px-6 py-2 bg-[#3e2f26] text-white rounded-lg hover:bg-[#2e1f16] transition-colors"
                >
                  View All Products
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Address Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Shipping Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {/* Product Summary */}
              {selectedProduct && (
                <div className="bg-[#f3ede2] rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{selectedProduct.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-600">
                          {selectedProduct.weight}g × {quantities[selectedProduct._id] || 1}
                        </span>
                        <span className="font-bold text-[#3e2f26]">
                          ₹{selectedProduct.price * (quantities[selectedProduct._id] || 1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Address Form */}
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { label: "Street Address", key: "address", placeholder: "Enter your street address" },
                  { label: "City", key: "city", placeholder: "Enter your city" },
                  { label: "Postal Code", key: "postalCode", placeholder: "Enter postal code" },
                  { label: "Country", key: "country", placeholder: "Enter your country" }
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {label}
                    </label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2f26] focus:border-transparent transition"
                      value={address[key]}
                      onChange={(e) =>
                        setAddress({ ...address, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleOrder}
                  className="w-full bg-[#3e2f26] text-white py-3.5 rounded-lg font-medium hover:bg-[#2e1f16] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Package className="h-5 w-5" />
                  Proceed to Payment
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3.5 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footor />
    </>
  );
}

export default OurProduct;