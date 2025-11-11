import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footor from "../components/Footor";
import { Plus, Minus, X } from "lucide-react";
import oystermushroomimg from "../assets/oystermushroom.jpg";
import roseimg from "../assets/rose.jpg";
import jasmineimg from "../assets/jasmin.png";
import hibiscusimg from "../assets/hibiscus.jpg";
import dryroseimg from "../assets/dryrose.png";
import drygingerimg from "../assets/dryginger.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const products = [
  { id: 1, title: "Oystor Mushrooms", description: "Delicious oyster mushrooms, freshly harvested.", price: 250, rating: 4.5, image: oystermushroomimg },
  { id: 2, title: "Rose", description: "Beautifully cultivated fresh roses.", price: 200, rating: 4, image: roseimg },
  { id: 3, title: "Jasmin", description: "Fresh jasmine flowers with calming aroma.", price: 180, rating: 4.8, image: jasmineimg },
  { id: 4, title: "Hibiscus", description: "Vibrant hibiscus flowers ideal for teas.", price: 180, rating: 4.8, image: hibiscusimg },
  { id: 5, title: "Dry Rose", description: "Naturally dried rose petals.", price: 180, rating: 4.8, image: dryroseimg },
  { id: 6, title: "Dry Ginger", description: "Premium dry ginger slices.", price: 180, rating: 4.8, image: drygingerimg },
];

function OurProduct() {
  const [quantities, setQuantities] = useState(products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {}));
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [address, setAddress] = useState({ address: "", city: "", postalCode: "", country: "" });

  const increaseQty = (id) => setQuantities((p) => ({ ...p, [id]: p[id] + 1 }));
  const decreaseQty = (id) => setQuantities((p) => ({ ...p, [id]: p[id] > 1 ? p[id] - 1 : 1 }));

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

      const orderData = {
        orderItems: [
          {
            name: selectedProduct.title,
            qty: quantities[selectedProduct.id],
            image: selectedProduct.image,
            price: selectedProduct.price,
            product: "672f1ab6e4c95f2dc98f343b", // replace with actual product ID from DB
          },
        ],
        shippingAddress: address,
        paymentMethod: "Razorpay",
        totalPrice: selectedProduct.price * quantities[selectedProduct.id],
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
      toast.error("❌ Something went wrong while creating the order!", { position: "top-center" });
    }
  };
  const openRazorpayPopup = (order) => {
    const token = localStorage.getItem("token");
    const options = {
      key: "rzp_test_RZbWROZOjz6zOD",
      amount: order.amount,
      currency: order.currency,
      name: "Organic Store",
      description: selectedProduct.title,
      image: "/logo.png",
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
            toast.success("order marked as paid!", {
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


  return (
    <>
      <Navbar />
      <main className="bg-[#f3ede2] min-h-screen py-12 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-[#3e2f26] text-center">
            Our Products
          </h1>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all flex flex-col overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition" />
                </div>
                <div className="flex flex-col flex-grow p-4">
                  <h2 className="text-lg font-semibold text-[#3e2f26] mb-1">{p.title}</h2>
                  <p className="text-sm text-[#5a4b3f] mb-3 leading-snug">{p.description}</p>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center mt-2 space-x-3">
                    <button onClick={() => decreaseQty(p.id)} className="p-2 bg-[#e5d5b3] rounded-full hover:bg-[#d9b382]">
                      <Minus className="w-4 h-4 text-[#3e2f26]" />
                    </button>
                    <span className="font-semibold text-[#3e2f26] text-lg">{quantities[p.id]}</span>
                    <button onClick={() => increaseQty(p.id)} className="p-2 bg-[#e5d5b3] rounded-full hover:bg-[#d9b382]">
                      <Plus className="w-4 h-4 text-[#3e2f26]" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="bg-gradient-to-r from-[#d9b382] to-[#b7c6a0] text-[#3e2f26] font-bold px-3 py-1 text-sm rounded-full">
                      ₹{p.price} / kg
                    </span>
                    <button
                      onClick={() => handleBuyClick(p)}
                      className="bg-[#3e2f26] text-[#f3ede2] py-2 px-4 text-sm rounded-md hover:bg-[#2b251f] transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
