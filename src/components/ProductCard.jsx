import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Mock variant options - in a real app, this would come from the product data
  const variantOptions = [
    { value: 'default', label: 'Default' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xl', label: 'XL' }
  ];

  // Mock stock status - in a real app, this would come from the product data
  const isOutOfStock = product.stock === 0 || product.stock === undefined;

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error('Product is out of stock!');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const productWithVariant = {
      ...product,
      selectedVariant,
      quantity: 1
    };
    
    dispatch(addCart(productWithVariant));
    toast.success(`Added ${product.title} to cart!`);
    setIsLoading(false);
  };

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img 
          src={product.image} 
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
        {isOutOfStock && (
          <div className="product-card__out-of-stock">
            <span>Out of Stock</span>
          </div>
        )}
        <div className="product-card__overlay">
          <Link 
            to={`/product/${product.id}`}
            className="product-card__view-details"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">
          {product.title.length > 50 
            ? `${product.title.substring(0, 50)}...` 
            : product.title
          }
        </h3>
        
        <div className="product-card__price">
          <span className="product-card__price-amount">
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="product-card__price-original">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <div className="product-card__variant">
          <label htmlFor={`variant-${product.id}`} className="product-card__variant-label">
            Size:
          </label>
          <select
            id={`variant-${product.id}`}
            value={selectedVariant}
            onChange={handleVariantChange}
            className="product-card__variant-select"
            disabled={isOutOfStock}
          >
            {variantOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="product-card__actions">
          {isOutOfStock ? (
            <button 
              className="product-card__button product-card__button--disabled"
              disabled
            >
              Out of Stock
            </button>
          ) : (
            <button 
              className="product-card__button product-card__button--primary"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="product-card__loading">
                  <span className="product-card__spinner"></span>
                  Adding...
                </span>
              ) : (
                'Add to Cart'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 