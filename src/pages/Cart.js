var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import axios from 'axios';
export default function Cart() {
    var _this = this;
    var _a = React.useState(JSON.parse(localStorage.getItem('cart') || '[]')), cart = _a[0], setCart = _a[1];
    var remove = function (productId) {
        var next = cart.filter(function (c) { return c.productId !== productId; });
        setCart(next);
        localStorage.setItem('cart', JSON.stringify(next));
    };
    var checkout = function () { return __awaiter(_this, void 0, void 0, function () {
        var token, res, err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    token = localStorage.getItem('token');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post('/api/checkout', { cart: cart }, { headers: { Authorization: "Bearer " + token } })];
                case 2:
                    res = _c.sent();
                    alert('Order placed: ' + JSON.stringify(res.data));
                    localStorage.removeItem('cart');
                    setCart([]);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _c.sent();
                    alert(((_b = (_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Checkout failed (login required)');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // ------------------ STYLES ----------------------
    var pageStyle = {
        padding: "20px",
        backgroundColor: "#f8f8f8",
        minHeight: "100vh"
    };
    var tableStyle = {
        width: "60%",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    };
    var rowStyle = {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #ddd",
        fontSize: "18px"
    };
    var buttonRemove = {
        backgroundColor: "#ff4d4d",
        color: "#fff",
        padding: "5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    };
    var checkoutBox = {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "20px"
    };
    var checkoutBtn = {
        backgroundColor: "#007bff",
        color: "white",
        padding: "12px 20px",
        fontSize: "18px",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none"
    };
    return (React.createElement("div", { style: pageStyle },
        React.createElement("h2", { style: { fontSize: "28px", fontWeight: "bold" } }, "Cart"),
        React.createElement("div", { style: tableStyle }, cart.map(function (c) { return (React.createElement("div", { key: c.productId, style: rowStyle },
            React.createElement("div", null,
                c.title,
                " \u00D7 ",
                c.qty),
            React.createElement("div", null,
                "\u20B9",
                c.price * c.qty),
            React.createElement("button", { style: buttonRemove, onClick: function () { return remove(c.productId); } }, "Remove"))); })),
        React.createElement("div", { style: checkoutBox },
            React.createElement("button", { style: checkoutBtn, onClick: checkout }, "Checkout"))));
}
