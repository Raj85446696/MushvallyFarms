import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footor from '../components/Footor';

const blogPosts = [
  {
    id: 1,
    title: "Health Benefits of Organic Mushrooms",
    excerpt: "Discover the many ways organic mushrooms can boost your immunity, vitamins, and overall health.",
    content: `Organic mushrooms are packed with vitamins D, B, and selenium. They support immune health, reduce inflammation, and provide antioxidants that help combat oxidative stress in the body. Regular consumption can improve gut health, enhance brain function, and provide essential nutrients for overall wellness.

Key Benefits:
• Rich in Vitamin D for bone health
• High in antioxidants for cellular protection
• Excellent source of dietary fiber
• Supports immune system function
• Natural anti-inflammatory properties

Our organic mushrooms are grown without pesticides or chemicals, ensuring you get the purest form of nature's superfood.`,
    date: "October 10, 2025",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
    category: "Health & Wellness",
    readTime: "4 min read"
  },
  {
    id: 2,
    title: "How We Sustainably Grow Our Mushrooms",
    excerpt: "Learn about our eco-friendly, innovative farming methods that ensure quality and protect the planet.",
    content: `We use controlled environments, organic substrates, and recycle materials to grow mushrooms sustainably. Our processes minimize carbon footprint while maximizing nutritional value.

Sustainable Practices:
• Water conservation systems
• Renewable energy sources
• Organic waste recycling
• Zero pesticide cultivation
• Carbon-neutral packaging

Our farming methods ensure that every mushroom you enjoy is not only healthy for you but also kind to our planet. We believe in growing food that nourishes both people and the environment.`,
    date: "October 15, 2025",
    image: "https://images.unsplash.com/photo-1652382449083-2c5f81efd8cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2127",
    category: "Sustainable Farming",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "5 Delicious Mushroom Recipes To Try",
    excerpt: "Try these easy and nutritious mushroom recipes to spice up your meals and enjoy nature's bounty.",
    content: `From creamy mushroom soup to sautéed shiitake dishes, here are 5 recipes that highlight the umami richness of mushrooms while keeping things healthy and delicious.

Featured Recipes:
1. Creamy Garlic Mushroom Pasta
2. Stuffed Portobello Mushrooms
3. Mushroom and Herb Risotto
4. Grilled Mushroom Skewers
5. Mushroom and Spinach Quiche

Each recipe is designed to be easy to follow while showcasing the unique flavors and textures of different mushroom varieties. Perfect for both beginner and experienced cooks looking to incorporate more mushrooms into their diet.`,
    date: "October 20, 2025",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    category: "Recipes",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "The Science Behind Mushroom Nutrition",
    excerpt: "Explore the scientific research supporting the incredible nutritional value of various mushroom species.",
    content: `Recent studies have revealed fascinating insights into mushroom nutrition. Different species offer unique health benefits that are backed by scientific research.

Scientific Findings:
• Lion's Mane for cognitive function
• Reishi for stress reduction
• Shiitake for immune support
• Oyster mushrooms for cholesterol management

Understanding the science helps us appreciate why mushrooms have been valued in traditional medicine for centuries and how modern research is validating these ancient practices.`,
    date: "October 25, 2025",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    category: "Science & Research",
    readTime: "5 min read"
  },
  {
    id: 5,
    title: "Mushroom Farming: From Spore to Harvest",
    excerpt: "Follow the fascinating journey of how mushrooms grow from tiny spores to harvest-ready produce.",
    content: `Mushroom cultivation is a delicate process that requires precise conditions and careful attention. Here's how we nurture our mushrooms from start to finish.

Growth Stages:
1. Spore germination and mycelium development
2. Substrate preparation and inoculation
3. Incubation period
4. Fruiting conditions
5. Harvesting at peak freshness

Each stage requires specific temperature, humidity, and lighting conditions to ensure optimal growth and maximum nutritional value.`,
    date: "November 1, 2025",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600&q=80",
    category: "Farming Process",
    readTime: "4 min read"
  },
  {
    id: 6,
    title: "Organic Certification: What It Really Means",
    excerpt: "Understanding the rigorous standards and processes behind organic certification for mushroom farming.",
    content: `Organic certification isn't just a label - it's a commitment to sustainable, chemical-free farming practices that benefit both consumers and the environment.

Certification Requirements:
• No synthetic pesticides or fertilizers
• Non-GMO substrates
• Sustainable water management
• Regular inspections and testing
• Transparent supply chain

We go beyond the basic requirements to ensure our mushrooms meet the highest standards of organic quality and environmental stewardship.`,
    date: "November 5, 2025",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80",
    category: "Quality Standards",
    readTime: "3 min read"
  }
];

function OurBlog() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = filter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);

  const openModal = (post) => {
    setActivePost(post);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActivePost(null);
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    if (modalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalOpen]);

  return (
    <>
      <Navbar />
      <div className={modalOpen ? "filter blur-sm pointer-events-none transition-all duration-300" : ""}>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#f9f6f0] via-[#f3ede2] to-[#ece3d3] py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2d231b] mb-6 leading-tight">
              Mushvalley Blog
            </h1>
            <p className="text-lg md:text-xl text-[#5a4638] max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover the latest insights on mushroom health benefits, sustainable farming practices, 
              delicious recipes, and the science behind nature's most versatile superfood.
            </p>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white shadow-lg'
                      : 'bg-white text-[#5a4638] border border-[#e8dfd0] hover:border-[#cfa86e] hover:shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gradient-to-br from-white to-[#f8f4ec] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#e8dfd0] overflow-hidden group cursor-pointer"
                  onClick={() => openModal(post)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <time className="text-sm text-[#5a4638] font-medium">{post.date}</time>
                      <span className="text-sm text-[#cfa86e] font-semibold">{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-[#2d231b] mb-3 line-clamp-2 group-hover:text-[#cfa86e] transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-[#5a4638] mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(post);
                      }}
                      className="text-[#cfa86e] font-semibold hover:text-[#b98b4f] transition-all duration-300 flex items-center gap-2 group/btn"
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read Full Article
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-[#2d231b] mb-4">No posts found</h3>
                <p className="text-[#5a4638] mb-6">Try selecting a different category to see more articles.</p>
                <button
                  onClick={() => setFilter('All')}
                  className="bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  View All Posts
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal */}
      {modalOpen && activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white hover:scale-110 transition-all duration-300"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#5a4638]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {activePost.category}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
              <header className="mb-6">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <time className="text-sm text-[#5a4638] font-medium">{activePost.date}</time>
                  <span className="text-sm text-[#cfa86e] font-semibold">{activePost.readTime}</span>
                </div>
                <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-[#2d231b] mb-4">
                  {activePost.title}
                </h2>
                <p className="text-lg text-[#5a4638] italic border-l-4 border-[#cfa86e] pl-4 py-2">
                  {activePost.excerpt}
                </p>
              </header>

              <div className="prose prose-lg max-w-none text-[#5a4638] leading-relaxed">
                {activePost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-[#e8dfd0]">
                <button className="flex-1 bg-gradient-to-r from-[#cfa86e] to-[#b98b4f] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                  Share Article
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 border-2 border-[#cfa86e] text-[#5a4638] px-6 py-3 rounded-xl font-semibold hover:bg-[#f8f3ea] transition-all duration-300"
                >
                  Close
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

export default OurBlog;