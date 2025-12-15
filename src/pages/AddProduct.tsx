import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api/axios";
import { AxiosError } from "axios";
import "../css/AddProduct.css";

/** Add product API error */
interface ApiError {
  message: string;
}

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const history = useHistory();

  const submitProduct = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setIsError(true);
      setMessage("Please login first to add products.");
      return;
    }

    try {
      await api.post("/api/products", {
        title,
        price: parseFloat(price),
      });

      setIsError(false);
      setMessage("✔ Product added successfully.");

      setTimeout(() => history.push("/"), 1500);
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      setIsError(true);
      setMessage(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={submitProduct}>
        <h2 className="add-product-heading">Add New Product</h2>

        <input
          className="add-product-input"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Product title"
          required
        />

        <input
          className="add-product-input"
          type="number"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
          placeholder="Product price"
          required
        />

        <button className="add-product-btn" type="submit">
          Add Product
        </button>

        {message && (
          <div
            className={`add-product-message ${
              isError ? "error" : "success"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
