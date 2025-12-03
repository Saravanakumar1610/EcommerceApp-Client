import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");     // inline message
  const [isError, setIsError] = useState(false);  // message style
  const history = useHistory();

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setIsError(true);
      setMessage("Please login first to add products.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        { title, price: parseFloat(price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsError(false);
      setMessage("✔ Product added successfully.");

      // redirect to home after 1.5s
      setTimeout(() => history.push("/"), 1500);
    } catch (err: any) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <form onSubmit={submitProduct} style={styles.form}>
      <h2 style={styles.heading}>Add New Product</h2>

      <input
        style={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Product title"
        required
      />

      <input
        style={styles.input}
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Product price"
        required
      />

      <button style={styles.btn} type="submit">
        Add Product
      </button>

      {/* Inline message */}
      {message && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "6px",
            fontWeight: "bold",
            backgroundColor: isError ? "#f8d7da" : "#d4edda",
            color: isError ? "#721c24" : "#155724",
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
}

const styles = {
  form: {
    width: "300px",
    margin: "50px auto",
    padding: "20px",
    background: "#f8f8f8",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  btn: {
    width: "100%",
    padding: "10px",
    fontSize: "18px",
    background: "blue",
    color: "white",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
  },
};
