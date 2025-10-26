import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import oystermushroomimg from "../assets/oystermushroom.jpg";
import roseimg from "../assets/rose.jpg";
import jasmineimg from "../assets/jasmin.png";
import hibiscusimg from "../assets/hibiscus.jpg";
import dryroseimg from "../assets/dryrose.png";
import drygingerimg from "../assets/dryginger.jpg";
import Footor from "../components/Footor";

function Home() {
  const slides = [
    {
      id: 1,
      title: "Oyster Mushroom",
      image: oystermushroomimg,
      description: "Fresh and organically grown oyster mushrooms — rich in nutrients and perfect for healthy meals.",
      details: ["High protein content", "Boosts immunity", "Sustainably cultivated"],
    },
    {
      id: 2,
      title: "Rose",
      image: roseimg,
      description: "Naturally grown roses ideal for decoration, fragrance, and skincare applications.",
      details: ["Pure fragrance", "No pesticides", "Freshly harvested"],
    },
    {
      id: 3,
      title: "Jasmine",
      image: jasmineimg,
      description: "Fragrant jasmine flowers grown with care for aromatherapy and decoration.",
      details: ["Soothing aroma", "Handpicked quality", "Eco-friendly packaging"],
    },
    {
      id: 4,
      title: "Hibiscus",
      image: hibiscusimg,
      description: "Bright and beautiful hibiscus flowers known for their herbal and skincare benefits.",
      details: ["Rich in antioxidants", "Supports hair health", "Chemical-free cultivation"],
    },
    {
      id: 5,
      title: "Dry Rose",
      image: dryroseimg,
      description: "Dried rose petals perfect for tea blends, skincare, and potpourri.",
      details: ["Sun-dried naturally", "Rich aroma", "Long shelf life"],
    },
    {
      id: 6,
      title: "Dry Ginger",
      image: drygingerimg,
      description: "Pure dried ginger with intense flavor and medicinal properties.",
      details: ["Improves digestion", "Boosts metabolism", "Naturally processed"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);


  const currentSlide = slides[currentIndex];

  const brandImages = [
    "https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8eSb4lGANjKmXnj-qOz6dX-tvglN7u-0STA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAhx1eku3Jmu-Sr-E8TTHo_47a8thLxBYGfg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4bW7LpZfsb8HDjcY04_3RNaLa3dNxGthhUw&s",
    "https://www.visa.com/images/merchantoffers/2025-05/1748510129625.SwiggyInstamart.png",
    "https://upload.wikimedia.org/wikipedia/commons/1/10/CityMall_PH.svg",
  ];

  return (
    <>
      <Navbar />
      {/* 🌾 Image Text Slider */}
      <div className="bg-gradient-to-b from-[#f6f2e8] to-[#ece3d3] min-h-screen text-[#3e2f26] flex flex-col items-center py-20 px-6 transition-all duration-700">
        {/* Hero Section */}
        <div className="max-w-4xl text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-wide leading-tight">
            Discover the <span className="text-[#cfa86e]">Mushvalley Farms</span> Collection
          </h1>
          <p className="text-lg md:text-xl text-[#6d5845] font-medium">
            Every bloom and harvest is a story — grown with care, nurtured by nature, and crafted for you.
          </p>
        </div>

        {/* Image + Info Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between max-w-6xl w-full gap-12">

          {/* Left Text */}
          <div
            key={`text-${currentIndex}`}
            className={`md:w-1/2 min-h-[320px] flex flex-col justify-center space-y-6 text-lg md:text-xl transition-all duration-700 ease-in-out ${fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
              }`}
            style={{
              transitionProperty: "opacity, transform",
              maxWidth: "500px",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[#3e2f26] leading-snug">
              {currentSlide.title}
            </h2>
            <p className="text-[#5a4638] leading-relaxed flex-grow">
              {currentSlide.description}
            </p>
            <ul className="list-disc list-inside text-[#5a4638] space-y-2">
              {currentSlide.details.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="mt-4 bg-[#cfa86e] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#b98b4f] hover:scale-105 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Right Image */}
          <div className="relative w-full md:w-1/2 flex justify-center items-center px-4">
            <div className="
        relative 
        w-full 
        max-w-[600px] 
        h-[250px] 
        sm:h-[300px] 
        md:h-[350px] 
        lg:h-[400px] 
        rounded-3xl 
        overflow-hidden 
        shadow-2xl 
        flex 
        justify-center 
        items-center 
        bg-[#f9f6f0]
      ">
              {slides.map((slide, idx) => (
                <img
                  key={idx}
                  src={slide.image}
                  alt={slide.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex space-x-3 mt-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setFade(true);
                }, 400);
              }}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${idx === currentIndex
                ? "bg-[#cfa86e] scale-110 shadow-md"
                : "bg-[#b7c6a0] hover:bg-[#d9b382]"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>


      {/* Why Choose Us Section */}
      <section className="max-w-4xl mx-auto mt-20 text-center px-6 md:px-0">
        <h2 className="text-3xl font-bold text-[#3e2f26] mb-6">
          Why Choose Mushvalley Farms?
        </h2>
        <p className="text-[#5a4638] mb-12 text-lg">
          We combine sustainability, innovation, and the natural power of mushrooms to bring you products that are good for you and the planet.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-10">
          {[
            { title: "Sustainability", desc: "Eco-friendly production with zero waste." },
            { title: "Organic Quality", desc: "Certified organic ingredients and materials." },
            { title: "Innovation", desc: "Mushroom-based products pushing boundaries." },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="
          bg-[#d9b382]
          rounded-2xl
          p-6
          shadow-lg
          transition-all
          duration-300
          transform
          hover:scale-105
          hover:shadow-2xl
          hover:bg-[#e1c08f]
          hover:-translate-y-2
          cursor-pointer
        "
            >
              <h3 className="font-semibold text-[#3e2f26] text-xl mb-2">
                {title}
              </h3>
              <p className="text-[#3e2f26]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* Promotional Banner */}
      <section className="mt-20 bg-[#b7c6a0] text-[#3e2f26] py-16 px-6 rounded-xl text-center max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-4">Lead the Change with Us !</h2>
        <p className="text-lg max-w-3xl mx-auto mb-8">
          Join us in transforming the world with products that blend nature, sustainability, and style.
        </p>
        <button className="bg-[#3e2f26] text-[#f3ede2] px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-[#2f241f] hover:shadow-lg hover:shadow-[#cfa86e]/40">
          Shop Now
        </button>

      </section>

      {/* Certificate Section */}
      <section className="max-w-7xl mx-auto mt-20 px-6 md:px-0">
        <h2 className="text-3xl font-bold text-[#3e2f26] mb-10 text-center">Our Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: "🌿",
              title: "Organic Certified",
              desc: "All products meet international organic standards.",
            },
            {
              icon: "♻️",
              title: "Eco-Friendly",
              desc: "Committed to sustainable and zero-waste production.",
            },
            {
              icon: "✅",
              title: "Quality Assurance",
              desc: "Strict testing for premium quality and safety.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-[#d9b382] rounded-lg p-8 shadow-lg flex flex-col items-center">
              <div className="text-6xl mb-4">{icon}</div>
              <h3 className="font-semibold text-[#3e2f26] text-2xl mb-2">{title}</h3>
              <p className="text-[#5a4638]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto my-20 px-6 md:px-0">
        <h2 className="text-3xl font-bold text-[#3e2f26] mb-12 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Anna W.",
              feedback: "Earthwoom products transformed my wellness routine. Truly sustainable and effective!",
            },
            {
              name: "David L.",
              feedback: "Excellent quality and fast delivery. The mushroom t-shirt is incredibly comfortable.",
            },
            {
              name: "Samantha K.",
              feedback: "Love the eco-friendly packaging and care put into every product.",
            },
          ].map(({ name, feedback }) => (
            <div key={name} className="bg-[#f0e8d8] rounded-lg p-6 shadow-md">
              <p className="italic text-[#5a4638] mb-4">"{feedback}"</p>
              <h4 className="text-[#3e2f26] font-semibold">- {name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto mb-20 px-6 md:px-0 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { number: "100%", description: "Organic & Natural" },
            { number: "5000+", description: "Happy Customers" },
            { number: "30+", description: "Products & Growing" },
          ].map(({ number, description }) => (
            <div key={description} className="bg-[#b7c6a0] rounded-lg p-10 shadow-lg">
              <span className="text-5xl font-extrabold text-[#3e2f26]">{number}</span>
              <p className="mt-2 text-[#3e2f26] font-medium">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Retainer */}
      <section className="my-20 max-w-7xl mx-auto px-6 md:px-0">
        <h2 className="text-3xl font-bold text-[#3e2f26] mb-6 text-center">
          Our Trusted Retainer
        </h2>

        <div className="overflow-hidden relative h-20">
          <div
            className="flex whitespace-nowrap marquee"
            style={{
              animationDuration: "20s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              display: "flex",
            }}
          >
            {[...brandImages, ...brandImages].map((src, idx) => (
              <div key={idx} className="mx-10 flex-shrink-0 flex items-center justify-center mt-5">
                <img
                  src={src}
                  alt={`Brand ${idx + 1}`}
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
    @keyframes marquee {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    .marquee {
      animation-name: marquee;
    }
  `}</style>
      </section>

      {/* Footer */}
      <Footor />
    </>
  );
}

export default Home;
