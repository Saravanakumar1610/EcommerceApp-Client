import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import api from "../api/axios";
import "../css/register.css";

export default function Register(props: RouteComponentProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [message, setMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/register", { name, email, password });
      setIsError(false);
      setMessage("✔ Registered successfully! Redirecting...");

      setTimeout(() => props.history.push("/login"), 1500);
    } catch (err: any) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={submit}>
        <h2>Register</h2>

        <input
          className="register-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <input
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        {/* PASSWORD TOGGLE */}
        <div className="password-wrapper">
          <input
            className="register-input"
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

        <button className="register-btn" type="submit">
          Register
        </button>

        {message && (
          <div className={`msg ${isError ? "msg-error" : "msg-success"}`}>
            {message}
          </div>
        )}

        {/* LOGIN LINK */}
        <p className="redirect-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
