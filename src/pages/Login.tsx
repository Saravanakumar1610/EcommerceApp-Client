import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';

export default function Login(props: RouteComponentProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState<"success" | "error" | "">("");

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);

      setMessage("✔ Login successful! Redirecting...");
      setMessageType("success");

      setTimeout(() => props.history.push("/"), 1500);

    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
      setMessageType("error");
    }
  };

  return (
    <>
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 90vh;
          background: #f5f5f5;
        }
        .login-box {
          width: 350px;
          padding: 30px;
          background: white;
          border-radius: 12px;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        .login-box h2 {
          margin-bottom: 20px;
          font-size: 26px;
          color: #333;
        }
        .login-input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }
        .login-btn {
          width: 100%;
          padding: 12px;
          background: #4a90e2;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        }
        .login-btn:hover {
          background: #357ABD;
        }

        .msg-box {
          margin-top: 15px;
          padding: 10px;
          border-radius: 6px;
          font-size: 15px;
          text-align: center;
        }
        .msg-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .msg-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>

      <div className="login-container">
        <form className="login-box" onSubmit={submit}>
          <h2>Login</h2>

          <input
            className="login-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />

          <input
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />

          <button className="login-btn" type="submit">
            Login
          </button>

          {/* INLINE MESSAGE */}
          {message && (
            <div className={`msg-box ${messageType === "success" ? "msg-success" : "msg-error"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
