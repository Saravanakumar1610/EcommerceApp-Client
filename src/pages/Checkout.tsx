import axios from "axios";
import React from "react";

export default function Checkout() {

  const [cart, setCart] = React.useState([]); // assuming cart state

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/checkout",
        { cart },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Order placed! Order ID: " + res.data.orderId);
    } catch (err: any) {
      alert(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <button onClick={handleCheckout}>
      Checkout
    </button>
  );
}
