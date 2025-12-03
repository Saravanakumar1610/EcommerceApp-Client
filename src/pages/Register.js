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
export default function Register(props) {
    var _this = this;
    var _a = React.useState(''), name = _a[0], setName = _a[1];
    var _b = React.useState(''), email = _b[0], setEmail = _b[1];
    var _c = React.useState(''), password = _c[0], setPassword = _c[1];
    var submit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post('http://localhost:5000/api/auth/register', {
                            name: name, email: email, password: password
                        })];
                case 2:
                    _c.sent();
                    alert('Registered');
                    props.history.push('/login');
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _c.sent();
                    alert(((_b = (_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Register failed');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, "\n        .register-container {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          height: 90vh;\n          background: #f5f5f5;\n        }\n        .register-box {\n          width: 350px;\n          padding: 30px;\n          background: white;\n          border-radius: 12px;\n          box-shadow: 0px 0px 10px rgba(0,0,0,0.1);\n          text-align: center;\n        }\n        .register-box h2 {\n          margin-bottom: 20px;\n          font-size: 30px;      /* BIGGER LETTERS */\n          color: #333;\n          font-weight: bold;\n        }\n        .register-input {\n          width: 100%;\n          padding: 10px;\n          margin: 10px 0;\n          border: 1px solid #ccc;\n          border-radius: 8px;\n          font-size: 16px;\n        }\n        .register-btn {\n          width: 100%;\n          padding: 12px;\n          background: #4a90e2;\n          color: white;\n          border: none;\n          border-radius: 8px;\n          cursor: pointer;\n          font-size: 16px;\n          margin-top: 10px;\n        }\n        .register-btn:hover {\n          background: #357ABD;\n        }\n      "),
        React.createElement("div", { className: "register-container" },
            React.createElement("form", { className: "register-box", onSubmit: submit },
                React.createElement("h2", null, "Register"),
                React.createElement("input", { className: "register-input", value: name, onChange: function (e) { return setName(e.target.value); }, placeholder: "Enter name" }),
                React.createElement("input", { className: "register-input", value: email, onChange: function (e) { return setEmail(e.target.value); }, placeholder: "Enter email" }),
                React.createElement("input", { className: "register-input", value: password, onChange: function (e) { return setPassword(e.target.value); }, type: "password", placeholder: "Enter password" }),
                React.createElement("button", { className: "register-btn", type: "submit" }, "Register")))));
}
