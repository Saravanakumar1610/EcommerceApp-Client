import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [message, setMessage] = React.useState(""); // ✔ inline message state

  // -----------------------------
  // Load products once on mount
  // -----------------------------
  React.useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((r) => setProducts(r.data));
  }, []);

  // -----------------------------
  // Add to Cart with inline message
  // -----------------------------
  const addToCart = (p: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const found = cart.find((it: any) => it.productId === p.id);
    if (found) found.qty++;
    else cart.push({ productId: p.id, title: p.title, price: p.price, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));

    // ✔ show inline message instead of alert
    setMessage(`${p.title} added to cart`);

    // ✔ message disappears after 1.5 sec
    setTimeout(() => setMessage(""), 1500);
  };

  // -----------------------------
  // Styling (same as your original)
  // -----------------------------
  const pageStyle = {
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    padding: "20px",
  };

  const productContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>PRODUCTS</h2>

      {/* ------------------------------------------ */}
      {/* Inline Success Message (no alert, no popup) */}
      {/* ------------------------------------------ */}
      {message && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: "5px",
            fontWeight: "bold",
            width: "300px",
          }}
        >
          {message}
        </div>
      )}

      {/* Products Grid */}
      <div style={productContainer}>
        {products.map((p) => (
          <div key={p.id} style={cardStyle}>
            <h3>{p.title}</h3>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>INR {p.price}</p>

            {/* Add to Cart */}
            <button style={buttonStyle} onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/cart">Go to Cart</Link>
      </div>
    </div>
  );
}
