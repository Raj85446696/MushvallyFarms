import React from 'react';
import Navbar from '../components/Navbar';
import Footor from '../components/Footor';
import oystermushroomimg from "../assets/oystermushroom.jpg";
import roseimg from "../assets/rose.jpg";
import jasmineimg from "../assets/jasmin.png";
import hibiscusimg from "../assets/hibiscus.jpg";
import dryroseimg from "../assets/dryrose.png";
import drygingerimg from "../assets/dryginger.jpg";

const products = [
  {
    id: 1,
    title: "Oystor Mushrooms",
    price: 250,
    rating: 4.5,
    image: oystermushroomimg,
  },
  {
    id: 2,
    title: "Rose",
    price: 200,
    rating: 4,
    image: roseimg,
  },
  {
    id: 3,
    title: "Jasmin",
    price: 180,
    rating: 4.8,
    image: jasmineimg,
  },
  {
    id: 4,
    title: "Hibiscus",
    price: 180,
    rating: 4.8,
    image: hibiscusimg,
  },
  {
    id: 5,
    title: "Dry Rose",
    price: 180,
    rating: 4.8,
    image: dryroseimg,
  },
  {
    id: 6,
    title: "Dry Ginger",
    price: 180,
    rating: 4.8,
    image: drygingerimg,
  },
];

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-green-700 mt-1">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.955L10 0l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
        </svg>
      ))}
      {halfStar && (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20" aria-hidden="true">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGrad)" d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.955L10 0l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={i} className="w-6 h-6 fill-gray-300" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.955L10 0l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}
function OurProduct() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f3ede2] min-h-screen py-20 px-10 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-[#3e2f26] text-center">
            Our Products
          </h1>
          <div className="grid gap-15 md:grid-cols-3">
            {products.map(({ id, title, price, rating, image }) => (
              <div
                key={id}
                className="relative flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                {/* Accent background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#d9b382]/10 to-transparent rounded-2xl z-0"></div>

                {/* Product Image */}
                <div className="relative w-full h-50 overflow-hidden rounded-t-2xl">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow z-10 relative">
                  <h2 className="text-2xl font-semibold text-[#3e2f26] mb-2">{title}</h2>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="bg-gradient-to-r from-[#d9b382] to-[#b7c6a0] text-[#3e2f26] font-bold px-3 py-1 rounded-full text-lg">
                      ₹{price}/kg
                    </span>
                  </div>
                  <StarRating rating={rating} />
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-gradient-to-r from-[#d9b382] to-[#b7c6a0] text-[#3e2f26] font-semibold py-3 rounded-lg hover:from-[#b7c6a0] hover:to-[#d9b382] hover:scale-105 transition-all duration-300">
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-[#3e2f26] text-[#f3ede2] font-semibold py-3 rounded-lg hover:bg-[#2b251f] hover:scale-105 transition-all duration-300">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footor />
    </>
  );
}

export default OurProduct;
