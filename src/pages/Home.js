import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Home() {
    var _a = React.useState([]), products = _a[0], setProducts = _a[1];
    // const location = useLocation();
    // React.useEffect(() => {
    //   axios.get('/api/products').then(r => setProducts(r.data));
    // }, [location.pathname]);    // re-load when navigating to Home
    // ✅ Only ONE useEffect — correct place
    React.useEffect(function () {
        axios.get('http://localhost:5000/api/products').then(function (r) { return setProducts(r.data); });
    }, []);
    var addToCart = function (p) {
        var cart = JSON.parse(localStorage.getItem('cart') || '[]');
        var found = cart.find(function (it) { return it.productId === p.id; });
        if (found)
            found.qty++;
        else
            cart.push({ productId: p.id, title: p.title, price: p.price, qty: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart');
    };
    // 🌟 Styles Section
    var pageStyle = {
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "20px"
    };
    var productContainer = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px"
    };
    var cardStyle = {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
    };
    var buttonStyle = {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px"
    };
    return (React.createElement("div", { style: pageStyle },
        React.createElement("h2", { style: { fontSize: "28px", fontWeight: "bold" } }, "PRODUCTS"),
        React.createElement("div", { style: productContainer }, products.map(function (p) { return (React.createElement("div", { key: p.id, style: cardStyle },
            React.createElement("h3", null, p.title),
            React.createElement("p", { style: { fontSize: "20px", fontWeight: "bold" } },
                "\u20B9",
                p.price),
            React.createElement("button", { style: buttonStyle, onClick: function () { return addToCart(p); } }, "Add to Cart"))); })),
        React.createElement("div", { style: { marginTop: "20px" } },
            React.createElement(Link, { to: "/cart" }, "Go to Cart"))));
}
