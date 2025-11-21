import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideNavbar';
import SubNavbar from '../components/SubNavbar';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function ListProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deletingIds, setDeletingIds] = useState(new Set());

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/products`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data for demo
        const mockProducts = [
          {
            _id: '1',
            name: 'Wireless Bluetooth Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150',
            price: 99.99,
            stock: 45,
            weight: 250, // Added weight field
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
            weight: 180, // Added weight field
            category: 'Clothing',
            createdAt: '2024-01-10T08:15:00Z',
            updatedAt: '2024-01-18T11:20:00Z'
          },
        ];
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
        setDeletingIds(prev => new Set(prev).add(productId));
        
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setProducts(prev => prev.filter(product => product._id !== productId));
          toast.success('Product deleted successfully! 🗑️');
        } else {
          toast.error(data.message || 'Failed to delete product ❌');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Something went wrong. Please try again later ⚠️');
      } finally {
        setDeletingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-800 bg-red-100 border-red-200' };
    if (stock < 10) return { text: 'Low Stock', color: 'text-orange-800 bg-orange-100 border-orange-200' };
    return { text: 'In Stock', color: 'text-green-800 bg-green-100 border-green-200' };
  };

  if (loading) {
    return (
      <>
        <SubNavbar />
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SubNavbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Product List</h1>
              <p className="text-gray-600">Manage your store products</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                {/* Search */}
                <div className="w-full lg:flex-1">
                  <div className="relative max-w-md">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 md:py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-colors text-sm md:text-base"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Category Filter & Add Button */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-colors text-sm md:text-base w-full sm:w-auto"
                  >
                    <option value="All">All Categories</option>
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <button 
                    onClick={() => navigate('/admin/addproduct')}
                    className="bg-[#8B7355] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-[#6F5B41] transition-colors flex items-center justify-center gap-2 text-sm md:text-base w-full sm:w-auto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Product
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 md:p-6 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                <div className="md:col-span-4 lg:col-span-4">Product</div>
                <div className="md:col-span-1 text-center">Price</div>
                <div className="md:col-span-2 text-center">Stock</div>
                <div className="md:col-span-2 text-center">Weight</div>
                <div className="md:col-span-2 text-center">Updated</div>
                <div className="md:col-span-1 text-center">Actions</div>
              </div>

              {/* Products List */}
              <div className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-2">No products found</p>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredProducts.map(product => {
                    const stockStatus = getStockStatus(product.stock);
                    const isDeleting = deletingIds.has(product._id);
                    
                    return (
                      <div key={product._id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                        {/* Mobile Layout */}
                        <div className="md:hidden space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                    {product.category}
                                  </span>
                                  <span className={`inline-block px-2 py-1 text-xs rounded-full border ${stockStatus.color}`}>
                                    {stockStatus.text}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Price:</span>
                              <div className="text-gray-900">₹{product.price}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Stock:</span>
                              <div className="text-gray-900">{product.stock} units</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Weight:</span>
                              <div className="text-gray-900">{product.weight || 'N/A'} gm</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Updated:</span>
                              <div className="text-gray-900 text-xs">{formatDate(product.updatedAt)}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                              onClick={() => navigate(`/admin/editproduct/${product._id}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              disabled={isDeleting}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete Product"
                            >
                              {isDeleting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                          {/* Product Info */}
                          <div className="md:col-span-4 lg:col-span-4 flex items-center gap-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                              <p className="text-sm text-gray-500 truncate">{product.description}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                  {product.category}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="md:col-span-1 flex items-center justify-center">
                            <span className="font-semibold text-gray-800">₹{product.price}</span>
                          </div>

                          {/* Stock */}
                          <div className="md:col-span-2 flex items-center justify-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${stockStatus.color}`}>
                              {product.stock} units
                            </span>
                          </div>

                          {/* Weight */}
                          <div className="md:col-span-2 flex items-center justify-center">
                            <span className="text-gray-800 font-medium">
                              {product.weight || 'N/A'} gm
                            </span>
                          </div>

                          {/* Last Updated */}
                          <div className="md:col-span-2 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-sm text-gray-600">
                                {formatDate(product.updatedAt)}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="md:col-span-1 flex items-center justify-center gap-1">
                            <button
                              onClick={() => navigate(`/admin/editproduct/${product._id}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              disabled={isDeleting}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete Product"
                            >
                              {isDeleting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
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