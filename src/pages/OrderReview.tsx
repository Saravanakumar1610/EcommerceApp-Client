import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/OrderReview.css";

/** Cart item structure */
interface OrderItem {
  productId: number;
  title: string;
  price: number;
  qty: number;
}

/** Order stored in localStorage */
interface Order {
  cart: OrderItem[];
}

const OrderReview: React.FC = () => {
  const history = useHistory();

  const order: Order | null = JSON.parse(
    localStorage.getItem("lastOrder") || "null"
  );

  const [message, setMessage] = useState<string>("");

  if (!order) {
    return (
      <div className="order-empty">
        <h2>No order found</h2>
      </div>
    );
  }

  const total: number = order.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const submitOrder = (): void => {
    setMessage("Order Placed Successfully!");

    setTimeout(() => {
      localStorage.removeItem("lastOrder");
      history.push("/");
    }, 1500);
  };

  return (
    <div className="order-container">
      <h2 className="order-title">Order Review</h2>

      <div className="order-box">
        {order.cart.map((item) => (
          <div key={item.productId} className="order-item">
            <div>
              {item.title} × {item.qty}
            </div>
            <div>INR {item.price * item.qty}</div>
          </div>
        ))}

        <h3 className="order-total">Total: INR {total}</h3>

        <button className="order-submit-btn" onClick={submitOrder}>
          Submit Order
        </button>

        {message && (
          <p className="order-success-message">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderReview;
