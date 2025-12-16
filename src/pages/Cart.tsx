import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useHistory } from "react-router-dom";
import "../css/Cart.css";

/** Cart item structure */

import { CartItem } from "../types/CartItem";
import { CheckoutResponse } from "../types/CheckoutResponse";

const Cart: React.FC = () => {
  const history = useHistory();

  // ✅ Safe cart initialization
  const initialCart: CartItem[] = (() => {
    try {
      const stored = localStorage.getItem("cart");
      if (!stored) return [];
      return JSON.parse(stored) as CartItem[];
    } catch {
      return [];
    }
  })();

  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const remove = (productId: number): void => {
    const next = cart.filter((c) => c.productId !== productId);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const checkout = async (): Promise<void> => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post<CheckoutResponse>(
        "/api/checkout",
        { cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          cart,
          message: res.data.message || "Order placed successfully",
          user: res.data.user || {},
        })
      );

      setCart([]);
      localStorage.removeItem("cart");
      history.push("/order-review");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message || "Checkout failed");
    }
  };

  // ✅ Empty cart view
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>

      <div className="cart-box">
        {cart.map((c) => (
          <div key={c.productId} className="cart-item">
            <div className="cart-item-title">
              {c.title} × {c.qty}
            </div>

            <div className="cart-item-price">
              INR {c.price * c.qty}
            </div>

            <button
              className="cart-remove-btn"
              onClick={() => remove(c.productId)}
            >
              Remove
            </button>
          </div>
        ))}


        <div className="cart-checkout-wrapper">
          <button className="cart-checkout-btn" onClick={checkout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
