import * as React from "react";
import { useHistory } from "react-router-dom";

export default function OrderReview() {
  const history = useHistory();

  const order = JSON.parse(localStorage.getItem("lastOrder") || "null");

  const [message, setMessage] = React.useState("");

  if (!order) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No order found</h2>
      </div>
    );
  }

  const total = order.cart?.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0
  );

  const submitOrder = () => {
    setMessage("Order Placed Successfully!");
  
    setTimeout(() => {
      localStorage.removeItem("lastOrder");
      history.push("/");
    }, 1500);
  };
  
  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Review</h2>

      <div
        style={{
          width: "60%",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        {order.cart?.map((item: any) => (
          <div
            key={item.productId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #ddd"
            }}
          >
            <div>
              {item.title} × {item.qty}
            </div>
            <div>₹{item.price * item.qty}</div>
          </div>
        ))}

        <h3 style={{ marginTop: "20px" }}>Total: ₹{total}</h3>

        {/* Submit Button */}
        <button
          onClick={submitOrder}
          style={{
            marginTop: "20px",
            backgroundColor: "#28a745",
            color: "white",
            padding: "12px 20px",
            fontSize: "18px",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none"
          }}
        >
          Submit Order
        </button>

        {/* Inline Success Message */}
        {message && (
          <p
            style={{
              marginTop: "15px",
              fontSize: "18px",
              color: "green",
              fontWeight: "bold"
            }}
          >
            {message}
          </p>
        )}

      </div>
    </div>
  );
}
