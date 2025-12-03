import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

class SessionTimeout extends React.Component<RouteComponentProps> {
  timeoutValue = 300000; // 5 minutes
  events = ["mousemove", "keydown", "click"];

  componentDidMount() {
    this.events.forEach(event => {
      window.addEventListener(event, this.resetTimer);
    });
    this.startTimer();
  }

  componentWillUnmount() {
    this.events.forEach(event => {
      window.removeEventListener(event, this.resetTimer);
    });
    clearTimeout((window as any).idleTimer);
  }

  startTimer = () => {
    const expiry = parseInt(localStorage.getItem("sessionExpiry") || "0");
    const remaining = expiry - Date.now();

    if (remaining <= 0) {
      this.logout();
    } else {
      (window as any).idleTimer = setTimeout(this.logout, remaining);
    }
  };

  resetTimer = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const newExpiry = Date.now() + this.timeoutValue;
    localStorage.setItem("sessionExpiry", newExpiry.toString());

    clearTimeout((window as any).idleTimer);
    this.startTimer();
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionExpiry");
    alert("Session expired. Please login again.");
    this.props.history.push("/login");
  };

  render() {
    return null;
  }
}

export default withRouter(SessionTimeout);
