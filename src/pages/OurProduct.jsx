import React from "react";
import Navbar from "../components/Navbar";
import Footor from "../components/Footor";
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
    description:
      "Delicious and tender oyster mushrooms, freshly harvested and rich in nutrients.",
    price: 250,
    rating: 4.5,
    image: oystermushroomimg,
    category: "Mushrooms",
  },
  {
    id: 2,
    title: "Rose",
    description:
      "Beautifully cultivated fresh roses, perfect for decoration and fragrance.",
    price: 200,
    rating: 4,
    image: roseimg,
    category: "Flowers",
  },
  {
    id: 3,
    title: "Jasmin",
    description:
      "Fresh jasmine flowers known for their calming aroma and traditional use.",
    price: 180,
    rating: 4.8,
    image: jasmineimg,
    category: "Flowers",
  },
  {
    id: 4,
    title: "Hibiscus",
    description:
      "Vibrant hibiscus flowers, ideal for teas and natural beauty treatments.",
    price: 180,
    rating: 4.8,
    image: hibiscusimg,
    category: "Flowers",
  },
  {
    id: 5,
    title: "Dry Rose",
    description:
      "Naturally dried rose petals suitable for potpourri, tea blends, and skincare.",
    price: 180,
    rating: 4.8,
    image: dryroseimg,
    category: "Dried Flowers",
  },
  {
    id: 6,
    title: "Dry Ginger",
    description:
      "Premium dry ginger slices packed with aroma and medicinal properties.",
    price: 180,
    rating: 4.8,
    image: drygingerimg,
    category: "Spices",
  }
];


function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-green-700 mt-1">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.955L10 0l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
        </svg>
      ))}
      {halfStar && (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGrad)"
            d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.955L10 0l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={i} className="w-5 h-5 fill-gray-300" viewBox="0 0 20 20" aria-hidden="true">
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
      <main className="bg-[#f3ede2] min-h-screen py-12 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-[#3e2f26] text-center tracking-wide">
            Our Products
          </h1>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(({ id, title, description, price, rating, image }) => (
              <div
                key={id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-400 flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow p-4">
                  <h2 className="text-lg md:text-xl font-semibold text-[#3e2f26] mb-1">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-sm text-[#5a4b3f] mb-3 leading-snug line-clamp-2">
                      {description}
                    </p>
                  )}
                  <StarRating rating={rating} />

                  <div className="mt-4 flex items-center justify-between">
                    <span className="bg-gradient-to-r from-[#d9b382] to-[#b7c6a0] text-[#3e2f26] font-bold px-3 py-1 text-sm rounded-full">
                      ₹{price} / kg
                    </span>
                    <button className="bg-[#3e2f26] text-[#f3ede2] font-medium py-2 px-4 text-sm rounded-md hover:bg-[#2b251f] hover:scale-105 transition-all duration-300">
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
