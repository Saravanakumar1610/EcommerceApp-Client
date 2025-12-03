import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import OrderReview from "./pages/OrderReview";

const navStyle: React.CSSProperties = {
  backgroundColor: "#eee",
  padding: "10px",
  fontSize: "18px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "20px"
};

const linkStyle: React.CSSProperties = {
  color: "blue",
  textDecoration: "none"
};

export default function App() {
  return (
    <div>
      <nav style={navStyle}>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/login">Login</Link>
        <Link style={linkStyle} to="/register">Register</Link>
        <Link style={linkStyle} to="/cart">Cart</Link>
        <Link style={linkStyle} to="/add-product">Add Product</Link>
      </nav>

      {/* 🔵 GLOBAL SESSION TIMEOUT HANDLER */}
      

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cart" component={Cart} />
        <Route path="/add-product" component={AddProduct} />
        <Route path="/order-review" component={OrderReview} />
      </Switch>
    </div>
  );
}
