import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import api from "../api/axios";
import "../css/Login.css";

export default function Login(props: RouteComponentProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] =
    React.useState<"success" | "error" | "">("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      setMessage("✔ Login successful! Redirecting...");
      setMessageType("success");

      setTimeout(() => props.history.push("/"), 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
      setMessageType("error");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={submit}>
        <h2>Login</h2>

        <input
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        {/* PASSWORD WITH TOGGLE */}
        <div className="password-wrapper">
          <input
            className="login-input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button className="login-btn" type="submit">
          Login
        </button>

        {/* MESSAGE */}
        {message && (
          <div
            className={`msg-box ${
              messageType === "success" ? "msg-success" : "msg-error"
            }`}
          >
            {message}
          </div>
        )}

        {/* REGISTER LINK */}
        <p className="redirect-text">
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
