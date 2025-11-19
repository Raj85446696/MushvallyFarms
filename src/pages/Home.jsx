import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import oystermushroomimg from "../assets/oystermushroom.jpg";
import roseimg from "../assets/rose.jpg";
import jasmineimg from "../assets/jasmin.png";
import hibiscusimg from "../assets/hibiscus.jpg";
import dryroseimg from "../assets/dryrose.png";
import drygingerimg from "../assets/dryginger.jpg";
import Footor from "../components/Footor";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
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

  const goToPrevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setFade(true);
    }, 500);
  };

  const goToNextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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
      
      {/* 🌾 Hero Slider Section */}
      <div className="bg-gradient-to-br from-[#f9f6f0] via-[#f3ede2] to-[#ece3d3] min-h-screen text-[#2d231b] flex flex-col items-center py-8 md:py-16 px-4 sm:px-6 lg:px-8 transition-all duration-700">
        {/* Hero Section */}
        <div className="max-w-6xl text-center mb-8 md:mb-16 relative w-full px-4">
          <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-16 h-16 md:w-20 md:h-20 bg-[#e8d6b8] rounded-full opacity-30 blur-xl"></div>
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-20 h-20 md:w-24 md:h-24 bg-[#d4c1a3] rounded-full opacity-40 blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-[#cfa86e] rounded-full opacity-10 blur-2xl"></div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 tracking-tight leading-tight relative z-10 px-2">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfa86e] to-[#b98b4f]">Mushvalley Farms</span> Collection
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#5a4638] font-light max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 px-2 sm:px-4">
            Every bloom and harvest is a story — grown with care, nurtured by nature, and crafted for you.
          </p>

          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 px-2">
            <button className="bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2 sm:gap-3 group text-sm sm:text-base" onClick={()=>navigate('/ourproduct')}>
              <span>Explore Collection</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="border-2 border-[#cfa86e] text-[#5a4638] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl md:rounded-2xl hover:bg-[#f8f3ea] hover:border-[#b98b4f] transition-all duration-300 font-semibold hover:scale-105 text-sm sm:text-base" onClick={()=>navigate('/aboutus')}>
              Our Story
            </button>
          </div>
        </div>

        {/* Image + Info Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl w-full gap-8 md:gap-12 lg:gap-16 mb-8 md:mb-12 px-4">
          {/* Left Text */}
          <div
            key={`text-${currentIndex}`}
            className={`w-full lg:w-2/5 min-h-[320px] md:min-h-[420px] flex flex-col justify-center space-y-6 md:space-y-8 text-base md:text-lg lg:text-xl transition-all duration-700 ease-in-out ${fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 md:-translate-x-8"
              }`}
          >
            <div className="inline-flex items-center gap-2 md:gap-3 text-[#cfa86e] font-semibold mb-3 md:mb-4 px-3 py-1 md:px-4 md:py-2 bg-[#f8f4ec] rounded-full w-fit text-sm md:text-base">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#cfa86e] animate-pulse"></div>
              <span>Featured Product</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2d231b] leading-tight">
              {currentSlide.title}
            </h2>
            <p className="text-[#5a4638] leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl font-light flex-grow">
              {currentSlide.description}
            </p>

            <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl md:rounded-3xl border border-[#e8dfd0] shadow-lg">
              <h3 className="font-bold text-[#2d231b] mb-3 md:mb-4 text-lg md:text-xl">Key Features</h3>
              <ul className="space-y-3 md:space-y-4">
                {currentSlide.details.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 md:gap-4 group">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#5a4638] font-medium text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 mt-3 md:mt-4">
              <button className="bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg md:rounded-xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2 sm:gap-3 group text-sm md:text-base">
                <span>Learn More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 md:h-5 md:w-5 group-hover:translate-y-0.5 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="border-2 border-[#cfa86e] text-[#5a4638] px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-[#f8f3ea] hover:border-[#b98b4f] transition-all duration-300 font-semibold hover:scale-105 text-sm md:text-base">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full lg:w-3/5 flex justify-center items-center mb-6 lg:mb-0">
            <div className="relative w-full max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-xl md:shadow-3xl flex justify-center items-center bg-gradient-to-br from-white to-[#f0e9dd] border border-[#e8dfd0]">
              {slides.map((slide, idx) => (
                <img
                  key={idx}
                  src={slide.image}
                  alt={slide.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                />
              ))}
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#cfa86e] rounded-full opacity-20 blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 md:-bottom-8 md:-left-8 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#b98b4f] rounded-full opacity-30 blur-sm"></div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 z-10 border border-[#e8dfd0]"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-[#5a4638]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 z-10 border border-[#e8dfd0]"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-[#5a4638]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mt-8 md:mt-12 mb-6 md:mb-8 px-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setFade(true);
                }, 500);
              }}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${idx === currentIndex
                ? "bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] scale-110 sm:scale-125 shadow-md md:shadow-lg"
                : "bg-[#d4c1a3] hover:bg-[#d9b382] hover:scale-105"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-1.5 md:h-2 bg-[#e8dfd0] rounded-full overflow-hidden mb-8 md:mb-16 px-4">
          <div 
            className="h-full bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d231b] mb-4 md:mb-6">
            Why Choose Mushvalley Farms?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5a4638] max-w-3xl mx-auto leading-relaxed px-2">
            We combine sustainability, innovation, and the natural power of mushrooms to bring you products that are good for you and the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
          {[
            { 
              title: "Sustainability", 
              desc: "Eco-friendly production with zero waste practices and carbon-neutral operations.",
              icon: "🌱"
            },
            { 
              title: "Organic Quality", 
              desc: "Certified organic ingredients and materials with full traceability from farm to table.",
              icon: "⭐"
            },
            { 
              title: "Innovation", 
              desc: "Cutting-edge mushroom-based products pushing the boundaries of natural wellness.",
              icon: "💡"
            },
          ].map(({ title, desc, icon }) => (
            <div
              key={title}
              className="group bg-gradient-to-br from-white to-[#f8f4ec] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 border border-[#e8dfd0] hover:border-[#cfa86e]/30"
            >
              <div className="text-4xl md:text-5xl mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
              <h3 className="font-bold text-[#2d231b] text-xl md:text-2xl mb-3 md:mb-4">
                {title}
              </h3>
              <p className="text-[#5a4638] leading-relaxed text-sm md:text-base">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#b7c6a0] to-[#a8b890] relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10 px-2">
          <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-20 h-20 md:w-40 md:h-40 bg-white/10 rounded-full blur-2xl md:blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-20 h-20 md:w-40 md:h-40 bg-white/10 rounded-full blur-2xl md:blur-3xl"></div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#2d231b] mb-4 md:mb-6 leading-tight">
            Lead the Change with Us!
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#3e2f26] max-w-3xl mx-auto mb-6 md:mb-8 lg:mb-10 leading-relaxed px-2">
            Join us in transforming the world with products that blend nature, sustainability, and style for a better tomorrow.
          </p>
          <button className="bg-gradient-to-r from-[#2d231b] to-[#3e2f26] text-[#f3ede2] px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-105 hover:shadow-xl md:hover:shadow-2xl hover:shadow-[#cfa86e]/40 group" onClick={()=>navigate('/ourproduct')}>
            <span className="flex items-center gap-2 sm:gap-3">
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d231b] mb-4 md:mb-6">
            Our Certifications
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5a4638] max-w-2xl mx-auto px-2">
            Quality and sustainability certifications that guarantee the excellence of our products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
          {[
            {
              icon: "🌿",
              title: "Organic Certified",
              desc: "All products meet international organic standards with full transparency.",
            },
            {
              icon: "♻️",
              title: "Eco-Friendly",
              desc: "Committed to sustainable and zero-waste production processes.",
            },
            {
              icon: "✅",
              title: "Quality Assurance",
              desc: "Strict testing protocols for premium quality and consumer safety.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gradient-to-br from-white to-[#f8f4ec] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 border border-[#e8dfd0] group">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
              <h3 className="font-bold text-[#2d231b] text-xl md:text-2xl mb-3 md:mb-4">{title}</h3>
              <p className="text-[#5a4638] leading-relaxed text-sm md:text-base">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f9f6f0] to-[#f3ede2] rounded-2xl md:rounded-3xl mb-8 md:mb-12 lg:mb-16">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d231b] mb-4 md:mb-6">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5a4638] max-w-2xl mx-auto px-2">
            Real experiences from our valued customers who trust Mushvalley Farms
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
          {[
            {
              name: "Anna W.",
              feedback: "Mushvalley products transformed my wellness routine. Truly sustainable and effective! The quality is exceptional.",
            },
            {
              name: "David L.",
              feedback: "Excellent quality and fast delivery. The oyster mushrooms are incredibly fresh and flavorful every time.",
            },
            {
              name: "Samantha K.",
              feedback: "Love the eco-friendly packaging and care put into every product. Definitely my go-to for organic produce.",
            },
          ].map(({ name, feedback }) => (
            <div key={name} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 border border-[#e8dfd0]">
              <div className="text-amber-400 text-xl md:text-2xl mb-3 md:mb-4">★★★★★</div>
              <p className="italic text-[#5a4638] text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">"{feedback}"</p>
              <h4 className="text-[#2d231b] font-bold text-lg md:text-xl">- {name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
          {[
            { number: "100%", description: "Organic & Natural Ingredients" },
            { number: "5000+", description: "Satisfied Customers" },
            { number: "30+", description: "Premium Products & Growing" },
          ].map(({ number, description }) => (
            <div key={description} className="bg-gradient-to-br from-[#b7c6a0] to-[#a8b890] rounded-2xl md:rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 group">
              <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#2d231b] block mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">{number}</span>
              <p className="text-[#2d231b] font-semibold text-base md:text-lg">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d231b] mb-4 md:mb-6">
              Our Trusted Partners
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#5a4638] max-w-2xl mx-auto px-2">
              Available across India's most trusted platforms and retail partners
            </p>
          </div>

          <div className="relative overflow-hidden px-2">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...brandImages, ...brandImages].map((src, idx) => (
                <div key={idx} className="mx-4 sm:mx-6 md:mx-8 flex-shrink-0 flex items-center justify-center">
                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-[#e8dfd0]">
                    <img
                      src={src}
                      alt={`Brand ${idx + 1}`}
                      className="h-8 sm:h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          @media (max-width: 640px) {
            .animate-marquee {
              animation: marquee 20s linear infinite;
            }
          }
        `}</style>
      </section>

      {/* Footer */}
      <Footor />
    </>
  );
}

export default Home;