import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footor from '../components/Footor';

const blogPosts = [
  {
    id: 1,
    title: "Health Benefits of Organic Mushrooms",
    excerpt: "Discover the many ways organic mushrooms can boost your immunity, vitamins, and overall health.",
    content: `Organic mushrooms are packed with vitamins D, B, and selenium. They support immune health, reduce inflammation, and provide antioxidants...`,
    date: "October 10, 2025",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "How We Sustainably Grow Our Mushrooms",
    excerpt: "Learn about our eco-friendly, innovative farming methods that ensure quality and protect the planet.",
    content: `We use controlled environments, organic substrates, and recycle materials to grow mushrooms sustainably. Our processes minimize carbon footprint...`,
    date: "October 15, 2025",
    image: "https://images.unsplash.com/photo-1652382449083-2c5f81efd8cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2127",
  },
  {
    id: 3,
    title: "5 Delicious Mushroom Recipes To Try",
    excerpt: "Try these easy and nutritious mushroom recipes to spice up your meals and enjoy nature’s bounty.",
    content: `From creamy mushroom soup to sautéed shiitake dishes, here are 5 recipes that highlight the umami richness of mushrooms...`,
    date: "October 20, 2025",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
];

function OurBlog() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);

  const openModal = (post) => {
    setActivePost(post);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';  // Prevent background scroll
  };

  const closeModal = () => {
    setActivePost(null);
    setModalOpen(false);
    document.body.style.overflow = 'auto';  // Restore scroll
  };

  return (
    <>
      <Navbar />
      <div className={modalOpen ? "filter blur-sm pointer-events-none" : ""}>
        <section className="bg-[#f3ede2] min-h-screen py-20 px-6 md:px-16 transition-filter duration-300">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 text-[#3e2f26]">Our Blog</h1>
            <p className="text-[#5a4638] max-w-3xl mb-16 text-lg">
              Read our latest posts on mushroom health benefits, sustainable farming, delicious recipes, and industry news.
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              {blogPosts.map(({ id, title, excerpt, date, image }) => (
                <article
                  key={id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                >
                  <img src={image} alt={title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <time className="text-sm text-[#b7c6a0] mb-2 block">{date}</time>
                    <h2 className="text-xl font-semibold text-[#3e2f26] mb-3">{title}</h2>
                    <p className="text-[#5a4638] mb-4">{excerpt}</p>
                    <button
                      onClick={() => openModal(blogPosts.find(post => post.id === id))}
                      className="text-[#d9b382] font-semibold hover:text-[#3e2f26] transition-colors duration-300"
                      aria-label={`Read more about ${title}`}
                    >
                      Read More &rarr;
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Modal */}
      {modalOpen && activePost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 flex justify-center items-center bg-[#f3ede2] bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl shadow-xl w-11/12 max-w-3xl p-6 md:p-10 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-[#3e2f26]">{activePost.title}</h2>
              <button
                onClick={closeModal}
                className="text-[#d9b382] hover:text-[#b7c6a0] text-3xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </header>
            <img
              src={activePost.image}
              alt={activePost.title}
              className="w-full h-48 object-cover rounded-xl mb-6"
            />
            <time className="text-sm text-[#b7c6a0] mb-4 block">{activePost.date}</time>
            <div className="text-[#5a4638] text-lg whitespace-pre-wrap">{activePost.content}</div>
          </div>
        </div>
      )}
      <Footor />
    </>
  );
}

export default OurBlog;
