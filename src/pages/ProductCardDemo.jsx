import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './ProductCardDemo.css';

const ProductCardDemo = () => {
  // Test data with various scenarios
  const testProducts = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      price: 89.99,
      originalPrice: 129.99,
      stock: 15,
      category: "electronics"
    },
    {
      id: 2,
      title: "Premium Cotton T-Shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      price: 24.99,
      stock: 0, // Out of stock
      category: "clothing"
    },
    {
      id: 3,
      title: "Smart Fitness Watch",
      image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
      price: 199.99,
      stock: 8,
      category: "electronics"
    },
    {
      id: 4,
      title: "Organic Coffee Beans",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
      price: 15.99,
      stock: 25,
      category: "food"
    },
    {
      id: 5,
      title: "Leather Crossbody Bag",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      price: 79.99,
      originalPrice: 99.99,
      stock: 3,
      category: "accessories"
    },
    {
      id: 6,
      title: "Wireless Gaming Mouse",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      price: 59.99,
      stock: 0, // Out of stock
      category: "electronics"
    },
    {
      id: 7,
      title: "Yoga Mat Premium",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      price: 34.99,
      stock: 12,
      category: "fitness"
    },
    {
      id: 8,
      title: "Ceramic Coffee Mug Set",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop",
      price: 19.99,
      stock: 20,
      category: "home"
    }
  ];

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = testProducts.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'in-stock') return product.stock > 0;
    if (filter === 'out-of-stock') return product.stock === 0;
    return product.category === filter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'stock':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });



  return (
    <div className="product-card-demo">
      <div className="demo-header">
        <h1>Product Card Demo</h1>
        <p>A responsive, modern product card component with all required features</p>
      </div>

      <div className="demo-controls">
        <div className="filter-section">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select 
            id="category-filter"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="demo-select"
          >
            <option value="all">All Products</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
            <option value="accessories">Accessories</option>
            <option value="fitness">Fitness</option>
            <option value="home">Home</option>
          </select>
        </div>

        <div className="sort-section">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="demo-select"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="stock">Stock Level</option>
          </select>
        </div>
      </div>

      <div className="demo-stats">
        <div className="stat-item">
          <span className="stat-label">Total Products:</span>
          <span className="stat-value">{filteredProducts.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">In Stock:</span>
          <span className="stat-value">{filteredProducts.filter(p => p.stock > 0).length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Out of Stock:</span>
          <span className="stat-value">{filteredProducts.filter(p => p.stock === 0).length}</span>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCardDemo; 