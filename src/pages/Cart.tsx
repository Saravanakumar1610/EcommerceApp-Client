import * as React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Cart() {
  const history = useHistory();

  // ✅ Initialize safely
  const initialCart = (() => {
    try {
      const stored = localStorage.getItem('cart');
      if (!stored) return [];
      return JSON.parse(stored);
    } catch {
      return [];
    }
  })();

  const [cart, setCart] = React.useState<any[]>(initialCart);

  const remove = (productId: number) => {
    const next = cart.filter(c => c.productId !== productId);
    setCart(next);
    localStorage.setItem('cart', JSON.stringify(next));
  };

  const checkout = async () => {
    if (!cart || cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        '/api/checkout',
        { cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem("lastOrder", JSON.stringify({
        cart: cart,
        message: res.data.message || "Order placed successfully",
        user: res.data.user || {}
      }));

      setCart([]);
      localStorage.removeItem('cart');

      history.push("/order-review");

    } catch (err) {
      alert(err.response?.data?.message || "Checkout failed");
    }
  };

  // ✅ Conditional rendering if cart is empty
  if (!cart || cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Cart is empty</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>Cart</h2>

      <div style={{
        width: "60%",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        {cart.map(c => (
          <div key={c.productId} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
            borderBottom: "1px solid #ddd",
            fontSize: "18px"
          }}>
            <div>{c.title} × {c.qty}</div>
            <div>₹{c.price * c.qty}</div>
            <button style={{
              backgroundColor: "#ff4d4d",
              color: "#fff",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }} onClick={() => remove(c.productId)}>Remove</button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <button style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "12px 20px",
          fontSize: "18px",
          borderRadius: "8px",
          cursor: "pointer",
          border: "none"
        }} onClick={checkout}>Checkout</button>
      </div>
    </div>
  );
}
