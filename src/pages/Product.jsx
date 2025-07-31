import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      
      // Use local test data instead of external API
      const testProducts = [
        {
          id: 1,
          title: "Wireless Bluetooth Headphones",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
          price: 89.99,
          originalPrice: 129.99,
          stock: 15,
          category: "electronics",
          description: "High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals who need crystal clear audio quality.",
          rating: { rate: 4.5, count: 128 }
        },
        {
          id: 2,
          title: "Premium Cotton T-Shirt",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          price: 24.99,
          stock: 0,
          category: "clothing",
          description: "Comfortable cotton t-shirt made from premium materials. Breathable fabric that keeps you cool and comfortable throughout the day.",
          rating: { rate: 4.2, count: 89 }
        },
        {
          id: 3,
          title: "Smart Fitness Watch",
          image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
          price: 199.99,
          stock: 8,
          category: "electronics",
          description: "Advanced fitness tracking with heart rate monitoring and GPS. Track your workouts, monitor your health, and stay connected with smart notifications.",
          rating: { rate: 4.7, count: 256 }
        },
        {
          id: 4,
          title: "Organic Coffee Beans",
          image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
          price: 15.99,
          stock: 25,
          category: "food",
          description: "Premium organic coffee beans sourced from sustainable farms. Rich flavor with notes of chocolate and caramel, perfect for coffee enthusiasts.",
          rating: { rate: 4.3, count: 156 }
        },
        {
          id: 5,
          title: "Leather Crossbody Bag",
          image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
          price: 79.99,
          originalPrice: 99.99,
          stock: 3,
          category: "accessories",
          description: "Stylish leather crossbody bag with adjustable strap. Perfect for everyday use with multiple compartments for organization.",
          rating: { rate: 4.4, count: 92 }
        },
        {
          id: 6,
          title: "Wireless Gaming Mouse",
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
          price: 59.99,
          stock: 0,
          category: "electronics",
          description: "High-precision wireless gaming mouse with customizable buttons. Perfect for gamers who demand accuracy and performance.",
          rating: { rate: 4.6, count: 203 }
        },
        {
          id: 7,
          title: "Yoga Mat Premium",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
          price: 34.99,
          stock: 12,
          category: "fitness",
          description: "Non-slip yoga mat made from eco-friendly materials. Provides excellent grip and cushioning for all types of yoga practice.",
          rating: { rate: 4.1, count: 67 }
        },
        {
          id: 8,
          title: "Ceramic Coffee Mug Set",
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop",
          price: 19.99,
          stock: 20,
          category: "home",
          description: "Set of 4 ceramic coffee mugs with beautiful designs. Microwave and dishwasher safe, perfect for daily use.",
          rating: { rate: 4.0, count: 45 }
        }
      ];
      
      // Find the product by ID
      const foundProduct = testProducts.find(p => p.id === parseInt(id));
      
      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
        
        // Find similar products from the same category
        const similar = testProducts.filter(p => 
          p.category === foundProduct.category && p.id !== foundProduct.id
        );
        setSimilarProducts(similar);
        setLoading2(false);
      } else {
        // Handle product not found
        setProduct({
          id: 0,
          title: "Product Not Found",
          image: "https://via.placeholder.com/400x400?text=Product+Not+Found",
          price: 0,
          category: "unknown",
          description: "The requested product could not be found.",
          rating: { rate: 0, count: 0 }
        });
        setSimilarProducts([]);
        setLoading(false);
        setLoading2(false);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6  my-4">${product.price}</h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
          <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
