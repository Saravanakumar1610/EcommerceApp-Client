import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';

export default function Register(props: RouteComponentProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [message, setMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name, email, password
      });

      setIsError(false);
      setMessage("✔ Registered successfully! Redirecting...");

      setTimeout(() => props.history.push("/login"), 1500);

    } catch (err: any) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <>
      <style>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 90vh;
          background: #f5f5f5;
        }
        .register-box {
          width: 350px;
          padding: 30px;
          background: white;
          border-radius: 12px;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        .register-box h2 {
          margin-bottom: 20px;
          font-size: 30px;
          color: #333;
          font-weight: bold;
        }
        .register-input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }
        .register-btn {
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
        .register-btn:hover {
          background: #357ABD;
        }
        .msg {
          margin-top: 12px;
          padding: 10px;
          border-radius: 6px;
          font-size: 15px;
        }
        .msg-success {
          background: #d4edda;
          color: #155724;
        }
        .msg-error {
          background: #f8d7da;
          color: #721c24;
        }
      `}</style>

      <div className="register-container">
        <form className="register-box" onSubmit={submit}>
          <h2>Register</h2>

          <input
            className="register-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
          />

          <input
            className="register-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />

          <input
            className="register-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />

          <button className="register-btn" type="submit">
            Register
          </button>

          {/* INLINE MESSAGE */}
          {message && (
            <div className={`msg ${isError ? "msg-error" : "msg-success"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
