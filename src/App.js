var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
var navStyle = {
    backgroundColor: "#eee",
    padding: "10px",
    fontSize: "18px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "20px" // spacing between links
};
var linkStyle = {
    color: "blue",
    textDecoration: "none"
};
export default function App() {
    return (React.createElement("div", null,
        React.createElement("nav", { style: navStyle },
            React.createElement(Link, { style: linkStyle, to: "/" }, "LIKEDIN SERVICE"),
            React.createElement(Link, { style: linkStyle, to: "/" }, "Home"),
            React.createElement(Link, { style: linkStyle, to: "/login" }, "Login"),
            React.createElement(Link, { style: linkStyle, to: "/register" }, "Register"),
            React.createElement(Link, { style: __assign(__assign({}, linkStyle), { marginRight: 0 }), to: "/cart" }, "Cart"),
            React.createElement(Link, { style: linkStyle, to: "/add-product" }, "AddPro")),
        React.createElement(Switch, null,
            React.createElement(Route, { exact: true, path: "/", component: Home }),
            React.createElement(Route, { path: "/login", component: Login }),
            React.createElement(Route, { path: "/register", component: Register }),
            React.createElement(Route, { path: "/cart", component: Cart }),
            React.createElement(Route, { path: "/add-product", component: AddProduct }))));
}
