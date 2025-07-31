import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "./ProductCard";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;



  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      
      // Use local test data instead of external API to avoid fetch errors
      const testProducts = [
        {
          id: 1,
          title: "Wireless Bluetooth Headphones",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
          price: 89.99,
          originalPrice: 129.99,
          stock: 15,
          category: "electronics",
          description: "High-quality wireless headphones with noise cancellation and long battery life."
        },
        {
          id: 2,
          title: "Premium Cotton T-Shirt",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          price: 24.99,
          stock: 0,
          category: "clothing",
          description: "Comfortable cotton t-shirt made from premium materials."
        },
        {
          id: 3,
          title: "Smart Fitness Watch",
          image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
          price: 199.99,
          stock: 8,
          category: "electronics",
          description: "Advanced fitness tracking with heart rate monitoring and GPS."
        },
        {
          id: 4,
          title: "Organic Coffee Beans",
          image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
          price: 15.99,
          stock: 25,
          category: "food",
          description: "Premium organic coffee beans sourced from sustainable farms."
        },
        {
          id: 5,
          title: "Leather Crossbody Bag",
          image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
          price: 79.99,
          originalPrice: 99.99,
          stock: 3,
          category: "accessories",
          description: "Stylish leather crossbody bag with adjustable strap."
        },
        {
          id: 6,
          title: "Wireless Gaming Mouse",
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
          price: 59.99,
          stock: 0,
          category: "electronics",
          description: "High-precision wireless gaming mouse with customizable buttons."
        },
        {
          id: 7,
          title: "Yoga Mat Premium",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
          price: 34.99,
          stock: 12,
          category: "fitness",
          description: "Non-slip yoga mat made from eco-friendly materials."
        },
        {
          id: 8,
          title: "Ceramic Coffee Mug Set",
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop",
          price: 19.99,
          stock: 20,
          category: "home",
          description: "Set of 4 ceramic coffee mugs with beautiful designs."
        }
      ];

      if (componentMounted) {
        setData(testProducts);
        setFilter(testProducts);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("clothing")}
          >
            Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("food")}
          >
            Food
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("accessories")}
          >
            Accessories
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("fitness")}
          >
            Fitness
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("home")}
          >
            Home
          </button>
        </div>

        <div className="products-grid">
          {filter.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
