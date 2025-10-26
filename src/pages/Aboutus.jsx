import React from "react";
import Navbar from "../components/Navbar";
import Footor from "../components/Footor";

function Aboutus() {
  return (
    <>
      <Navbar />
      <section className="bg-[#f3ede2] min-h-screen flex flex-col items-center pt-10">
        {/* Top Section with Image + About */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center px-4 md:px-10 mt-8 md:mt-20">
          <div className="flex-1 mb-8 md:mb-0 md:mr-12 animate-fadeInLeft">
            <h2 className="text-3xl font-bold text-[#3e2f26] mb-4">About Our Store</h2>
            <p className="text-[#5a4638] text-lg mb-6">
              We’re passionate about growing and delivering the freshest organic mushrooms. Founded on principles of sustainability and quality, our mission is to nourish lives and inspire healthy eating—from farm to table.
            </p>
            <p className="text-[] font-semibold">Locally grown. Globally loved.</p>
          </div>
          <div className="flex-1 flex justify-center animate-fadeInRight">
            <img
              src="https://plus.unsplash.com/premium_photo-1672883552341-eaebc9240719?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
              alt="About Mushroom Store"
              className="rounded-3xl shadow-2xl w-full h-72 object-cover"
            />
          </div>
        </div>

        {/* 4 Info Cards */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-7 my-16 px-4 md:px-10">
          <div className="bg-[#d9b382] rounded-xl shadow-lg p-8 flex flex-col items-center 
              transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 animate-fadeInUp delay-100">
            <svg width="48" height="48" className="mb-3" fill="#3e2f26" viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 1 5 5v2H7V7a5 5 0 0 1 5-5Zm7 7v1a7 7 0 1 1-14 0V9H5v1a9 9 0 1 0 18 0V9h-2Zm-7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path></svg>
            <h3 className="text-lg font-bold text-[#3e2f26] mb-2">Sustainable Farming</h3>
            <p className="text-[#3e2f26] text-center">Eco-friendly methods ensure top quality and nature care.</p>
          </div>
          <div className="bg-[#b7c6a0] rounded-xl shadow-lg p-8 flex flex-col items-center 
              transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 animate-fadeInUp delay-200">
            <svg width="48" height="48" className="mb-3" fill="#3e2f26" viewBox="0 0 24 24"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm4 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path></svg>
            <h3 className="text-lg font-bold text-[#3e2f26] mb-2">Pure & Organic</h3>
            <p className="text-[#3e2f26] text-center">No chemicals, only natural goodness in every mushroom.</p>
          </div>
          <div className="bg-[#d9b382] rounded-xl shadow-lg p-8 flex flex-col items-center 
              transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 animate-fadeInUp delay-300">
            <svg width="48" height="48" className="mb-3" fill="#3e2f26" viewBox="0 0 24 24"><path d="M17.657 6.343A8 8 0 1 0 6.343 17.657a8 8 0 1 0 11.314-11.314Zm-5.657 8.485A3.978 3.978 0 0 1 8 12c0-1.104.896-2 2-2s2 .896 2 2a3.978 3.978 0 0 1-1.657 2.828Z"></path></svg>
            <h3 className="text-lg font-bold text-[#3e2f26] mb-2">Fast Delivery</h3>
            <p className="text-[#3e2f26] text-center">Fresh mushrooms at your door, preserving taste and quality.</p>
          </div>
          <div className="bg-[#b7c6a0] rounded-xl shadow-lg p-8 flex flex-col items-center 
              transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 animate-fadeInUp delay-400">
            <svg width="48" height="48" className="mb-3" fill="#3e2f26" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12c0-1.617.385-3.144 1.07-4.491l9.03 11.902 9.03-11.902A9.953 9.953 0 0 1 22 12c0 5.523-4.477 10-10 10Z"></path></svg>
            <h3 className="text-lg font-bold text-[#3e2f26] mb-2">Trusted by Thousands</h3>
            <p className="text-[#3e2f26] text-center">Quality, service, and reliability—loved by our loyal customers.</p>
          </div>
        </div>
      </section>
      {/* What We Do & How We Do It Section */}
      <section className="w-full  px-0">
        <div className="bg-[#ffffff] flex flex-col md:flex-row md:justify-between items-start py-14 px-8 md:px-24 group">
          <div className="flex-1 mb-10 md:mb-0 md:mr-14 animate-fadeInLeft">
            <h3 className="text-4xl font-extrabold text-[#3e2f26] mb-7 leading-tight">What We Do</h3>
            <p className="text-[#3e2f26] text-lg leading-relaxed mb-6 max-w-xl">
              We cultivate and deliver premium, organic mushrooms for a healthier world. Our mission is to nurture people and planet — blending sustainable farming with nutritious eating to help families enjoy better food and a better future.
            </p>
            <ul className="list-disc list-inside ml-6 max-w-sm space-y-3">
              <li className="text-[#b7c6a0] font-semibold text-lg">Eco-Friendly Cultivation</li>
              <li className="text-[#d9b382] font-semibold text-lg">Community Engagement</li>
              <li className="text-[#3e2f26] font-semibold text-lg">Continuous Innovation</li>
            </ul>
          </div>
          <div className="flex-1 animate-fadeInRight md:ml-14">
            <h3 className="text-4xl font-extrabold text-[#3e2f26] mb-7 leading-tight">How We Do It</h3>
            <div className="bg-white bg-opacity-90 rounded-3xl p-10 shadow-xl max-w-md">
              <ul className="text-[#3e2f26] text-lg space-y-4 font-medium leading-relaxed">
                <li><span className="text-[#d9b382] font-black mr-2 select-none">✓</span> Carefully select organic spawn and substrates</li>
                <li><span className="text-[#b7c6a0] font-black mr-2 select-none">✓</span> Utilize climate-controlled, eco-smart growing environments</li>
                <li><span className="text-[#3e2f26] font-black mr-2 select-none">✓</span> Hand-harvest each mushroom for peak freshness and flavor</li>
                <li><span className="text-[#d9b382] font-black mr-2 select-none">✓</span> Fast packaging and delivery to maintain optimal quality</li>
                <li><span className="text-[#b7c6a0] font-black mr-2 select-none">✓</span> Educate and inspire customers through transparent knowledge sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footor />
      <style>
        {`
        @keyframes fadeInLeft {from{opacity:0;transform:translateX(-40px);}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeInRight {from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeInUp {from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0)}}
        .animate-fadeInLeft {animation: fadeInLeft 1s both;}
        .animate-fadeInRight {animation: fadeInRight 1s both;}
        .animate-fadeInUp {animation: fadeInUp 1s both;}
        .delay-100 {animation-delay: .1s;}
        .delay-200 {animation-delay: .2s;}
        .delay-300 {animation-delay: .3s;}
        .delay-400 {animation-delay: .4s;}
      `}
      </style>
    </>
  );
}

export default Aboutus;
