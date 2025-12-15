import React from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import OrderReview from "./pages/OrderReview";

import "./css/App.css";

const App: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="app-container">
      <header className="home-header">
        <div className="company-name">MyShop</div>

        <nav className="app-nav">
          {path !== "/" && (
            <Link className="nav-link" to="/">Home</Link>
          )}

          {path !== "/login" && path !== "/register" && (
            <Link className="nav-link" to="/login">Login</Link>
            
          )}

          {path !== "/register" && path !== "/login" &&(
            <Link className="nav-link" to="/register">Register</Link>
          )}

          {path !== "/cart" && (
            <Link className="nav-link" to="/cart">Cart</Link>
          )}

          {path !== "/add-product" && (
            <Link className="nav-link" to="/add-product">
              Add Product
            </Link>
          )}
        </nav>
      </header>

      {/* ROUTES */}
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
};

export default App;
