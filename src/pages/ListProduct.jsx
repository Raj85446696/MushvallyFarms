import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideNavbar';
import SubNavbar from '../components/SubNavbar';
import { useNavigate } from 'react-router-dom';

function ListProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockProducts = [
      {
        _id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150',
        price: 99.99,
        stock: 45,
        category: 'Electronics',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-20T14:25:00Z'
      },
      {
        _id: '2',
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable organic cotton t-shirt in various colors',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150',
        price: 29.99,
        stock: 100,
        category: 'Clothing',
        createdAt: '2024-01-10T08:15:00Z',
        updatedAt: '2024-01-18T11:20:00Z'
      },
      {
        _id: '3',
        name: 'Stainless Steel Water Bottle',
        description: '1L insulated stainless steel water bottle',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150',
        price: 24.99,
        stock: 0,
        category: 'Sports',
        createdAt: '2024-01-05T16:45:00Z',
        updatedAt: '2024-01-22T09:10:00Z'
      },
      {
        _id: '4',
        name: 'Programming Book Bundle',
        description: 'Complete guide to modern web development',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150',
        price: 49.99,
        stock: 25,
        category: 'Books',
        createdAt: '2024-01-12T12:20:00Z',
        updatedAt: '2024-01-12T12:20:00Z'
      },
      {
        _id: '5',
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitor',
        image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=150',
        price: 199.99,
        stock: 15,
        category: 'Electronics',
        createdAt: '2024-01-08T09:30:00Z',
        updatedAt: '2024-01-19T16:45:00Z'
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Sports', 'Home & Garden', 'Beauty'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || 
                           product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Simulate API call
        setProducts(prev => prev.filter(product => product._id !== productId));
        console.log('Product deleted:', productId);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    if (stock < 10) return { text: 'Low Stock', color: 'text-orange-600 bg-orange-50' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-50' };
  };

  if (loading) {
    return (
      <>
        <SubNavbar />
        <div className="flex h-screen bg-[#F8F4F0]">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto"></div>
              <p className="mt-4 text-[#6F5B41]">Loading products...</p>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SubNavbar />
      <div className="flex h-screen bg-[#F8F4F0]">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#6F5B41] mb-2">Product List</h1>
              <p className="text-[#8B7355]">Manage your store products</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                {/* Search */}
                <div className="flex-1 w-full lg:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full lg:w-80 px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-colors"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex gap-4 items-center">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-colors"
                  >
                    <option value="All">All Categories</option>
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <button className="bg-[#8B7355] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6F5B41] transition-colors flex items-center gap-2"  onClick={()=>navigate('/admin/addproduct')}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Add Product
                  </button>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 font-semibold text-gray-700">
                <div className="col-span-4">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Stock</div>
                <div className="col-span-2 text-center">Last Updated</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>

              {/* Products List */}
              <div className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    No products found. Try adjusting your search or filters.
                  </div>
                ) : (
                  filteredProducts.map(product => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <div key={product._id} className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors">
                        {/* Product Info */}
                        <div className="col-span-4 flex items-center gap-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-500 truncate max-w-xs">{product.description}</p>
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mt-1">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 flex items-center justify-center">
                          <span className="font-semibold text-gray-800">${product.price}</span>
                        </div>

                        {/* Stock */}
                        <div className="col-span-2 flex items-center justify-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                            {product.stock} units
                          </span>
                        </div>

                        {/* Last Updated */}
                        <div className="col-span-2 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">
                              {formatDate(product.updatedAt)}
                            </div>
                            <div className="text-xs text-gray-400">
                              Created: {formatDate(product.createdAt)}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 flex items-center justify-center gap-2">
                          <button
                            onClick={() => console.log('Edit product:', product._id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>

                          <button
                            onClick={() => console.log('View product:', product._id)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ListProduct;