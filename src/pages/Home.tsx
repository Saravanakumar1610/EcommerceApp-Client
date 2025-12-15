import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../css/Home.css";

/* ===============================
   TYPES
================================ */
interface Product {
  id: number;
  title: string;
  price: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");

  /* -----------------------------
     Load products
  ----------------------------- */
  useEffect(() => {
    api
      .get<Product[]>("/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  /* -----------------------------
     Add to cart
  ----------------------------- */
  const addToCart = (p: Product): void => {
    const cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const found = cart.find((it) => it.productId === p.id);
    if (found) {
      found.qty++;
    } else {
      cart.push({
        productId: p.id,
        title: p.title,
        price: p.price,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setMessage(`${p.title} added to cart`);
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div className="home-page">
      {/* ================= HEADER ================= */}
   

      {/* ================= CONTENT ================= */}
      <div className="home-content">
        <h2 className="page-title">Products</h2>

        {message && <div className="success-message">{message}</div>}

        <div className="product-flex">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <h3>{p.title}</h3>
              <p className="price">INR {p.price}</p>

              <button className="btn" onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
